import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import OpenAI from 'openai';

export interface ClimateData {
  month: string;
  temperature: string | null;
  precipitation: string | null;
}


@Injectable()
export class ClimateService {
  private readonly logger = new Logger(ClimateService.name);
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('openai.apiKey'),
    });
  }

  /**
   * Fetch monthly average climate data (rain and temperature)
   * @param lat Property latitude
   * @param lon Property longitude
   * @returns Array with monthly climate data
   */
  async getClimateData(lat: number, lon: number): Promise<ClimateData[]> {
    try {
      this.logger.log(`Fetching climate data for coordinates: ${lat}, ${lon}`, 'getClimateData');
      
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2000-01-01&end_date=2023-12-31&daily=temperature_2m_mean,precipitation_sum&models=best_match&timezone=America/Sao_Paulo`;
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Climate API error: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json() as any;

      // Check if we have valid data
      if (!data.daily || !data.daily.time || !data.daily.temperature_2m_mean || !data.daily.precipitation_sum) {
        throw new Error('Climate data not available for this location');
      }

      // Group data by month and calculate averages
      const monthlyData = this.calculateMonthlyAverages(data.daily);

      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const monthlyClimate: ClimateData[] = months.map((month, i) => {
        const monthData = monthlyData[i + 1]; // i+1 because months go from 1-12
        return {
          month,
          temperature: monthData ? monthData.avgTemperature.toFixed(1) : null,
          precipitation: monthData ? monthData.totalPrecipitation.toFixed(1) : null,
        };
      });

      this.logger.log(`Climate data obtained successfully for ${lat}, ${lon}`, 'getClimateData');
      return monthlyClimate;
      
    } catch (error) {
      this.logger.error(`Error fetching climate data for ${lat}, ${lon}:`, error.message, 'getClimateData');
      throw error;
    }
  }

  private calculateMonthlyAverages(dailyData: any): { [month: number]: { avgTemperature: number; totalPrecipitation: number } } {
    const monthlyData: { [month: number]: { temperatures: number[]; precipitations: number[] } } = {};

    // Inicializar arrays para cada mês
    for (let i = 1; i <= 12; i++) {
      monthlyData[i] = { temperatures: [], precipitations: [] };
    }

    // Agrupar dados por mês
    dailyData.time.forEach((date: string, index: number) => {
      const month = new Date(date).getMonth() + 1; // getMonth() retorna 0-11, então +1
      const temperature = dailyData.temperature_2m_mean[index];
      const precipitation = dailyData.precipitation_sum[index];

      if (temperature !== null && temperature !== undefined) {
        monthlyData[month].temperatures.push(temperature);
      }
      if (precipitation !== null && precipitation !== undefined) {
        monthlyData[month].precipitations.push(precipitation);
      }
    });

    // Calcular médias e totais
    const result: { [month: number]: { avgTemperature: number; totalPrecipitation: number } } = {};
    
    for (let month = 1; month <= 12; month++) {
      const temps = monthlyData[month].temperatures;
      const precips = monthlyData[month].precipitations;
      
      result[month] = {
        avgTemperature: temps.length > 0 ? temps.reduce((sum, temp) => sum + temp, 0) / temps.length : 0,
        totalPrecipitation: precips.length > 0 ? precips.reduce((sum, precip) => sum + precip, 0) : 0
      };
    }

    return result;
  }

  /**
   * Generate personalized pasture growth table and reproductive calendar
   * @param lat Property latitude
   * @param lon Property longitude
   * @returns Pasture planning in JSON format
   */
  async generatePasturePlanning(lat: number, lon: number): Promise<any> {
    try {
      this.logger.log(`Generating pasture planning for coordinates: ${lat}, ${lon}`, 'generatePasturePlanning');
      
      // Fetch climate data
      this.logger.log(`Fetching climate data for pasture analysis`, 'generatePasturePlanning');
      const climate = await this.getClimateData(lat, lon);
      this.logger.log(`Climate data obtained successfully for analysis`, 'generatePasturePlanning');

      const prompt = `
You are a technical consultant for livestock and pasture management.
Based on the following climate data (average temperature and monthly precipitation)
for the location (lat: ${lat}, lon: ${lon}), generate ONLY a JSON with the months and forage growth classification.

Return ONLY the JSON in the format:

{
  "pasture": [
    {"month": "January", "state": "Good"},
    {"month": "February", "state": "Good"},
    {"month": "March", "state": "Good"},
    {"month": "April", "state": "Medium"},
    {"month": "May", "state": "Medium"},
    {"month": "June", "state": "Medium"},
    {"month": "July", "state": "Medium"},
    {"month": "August", "state": "Medium"},
    {"month": "September", "state": "Medium"},
    {"month": "October", "state": "Medium"},
    {"month": "November", "state": "Good"},
    {"month": "December", "state": "Good"}
  ]
}

DO NOT include explanations, comments or other text. Only the JSON.

Climate data:
${JSON.stringify(climate, null, 2)}
`;

      // Send request to OpenAI
      this.logger.log(`Sending request to OpenAI GPT-5 nano`, 'generatePasturePlanning');
      const response = await this.openai.chat.completions.create({
        model: "gpt-5-nano",
        messages: [{ role: "user", content: prompt }],
      });
      this.logger.log(`Response received from OpenAI successfully`, 'generatePasturePlanning');

      this.logger.log(`Pasture planning generated successfully for ${lat}, ${lon}`, 'generatePasturePlanning');
      
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      // Try to parse JSON
      this.logger.log(`Parsing JSON response from pasture planning`, 'generatePasturePlanning');
      const pastureData = JSON.parse(content);
      
      return pastureData;
      
    } catch (error) {
      this.logger.error(`Error generating pasture planning for ${lat}, ${lon}:`, error.message, 'generatePasturePlanning');
      throw error;
    }
  }

}
