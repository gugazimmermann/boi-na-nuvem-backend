import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';

@ApiTags('employees')
@Controller('employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name);

  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários retornada com sucesso' })
  async getAllEmployees() {
    this.logger.log('GET /employee - Request received', 'getAllEmployees');
    
    try {
      const result = await this.employeeService.getAllEmployees();
      this.logger.log('GET /employee - Request completed successfully', 'getAllEmployees');
      return result;
    } catch (error) {
      this.logger.error('GET /employee - Request failed', error.stack, 'getAllEmployees');
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter funcionário por ID' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  async getEmployeeById(@Param('id') id: string) {
    this.logger.log(`GET /employee/${id} - Request received`, 'getEmployeeById');
    
    try {
      const result = await this.employeeService.getEmployeeById(id);
      this.logger.log(`GET /employee/${id} - Request completed successfully`, 'getEmployeeById');
      return result;
    } catch (error) {
      this.logger.error(`GET /employee/${id} - Request failed`, error.stack, 'getEmployeeById');
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo funcionário' })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createEmployee(@Body() createEmployeeDto: any) {
    this.logger.log('POST /employee - Request received', 'createEmployee');
    
    try {
      const result = await this.employeeService.createEmployee(createEmployeeDto);
      this.logger.log('POST /employee - Request completed successfully', 'createEmployee');
      return result;
    } catch (error) {
      this.logger.error('POST /employee - Request failed', error.stack, 'createEmployee');
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: any) {
    this.logger.log(`PUT /employee/${id} - Request received`, 'updateEmployee');
    
    try {
      const result = await this.employeeService.updateEmployee(id, updateEmployeeDto);
      this.logger.log(`PUT /employee/${id} - Request completed successfully`, 'updateEmployee');
      return result;
    } catch (error) {
      this.logger.error(`PUT /employee/${id} - Request failed`, error.stack, 'updateEmployee');
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar funcionário' })
  @ApiParam({ name: 'id', description: 'ID do funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  async deleteEmployee(@Param('id') id: string) {
    this.logger.log(`DELETE /employee/${id} - Request received`, 'deleteEmployee');
    
    try {
      const result = await this.employeeService.deleteEmployee(id);
      this.logger.log(`DELETE /employee/${id} - Request completed successfully`, 'deleteEmployee');
      return result;
    } catch (error) {
      this.logger.error(`DELETE /employee/${id} - Request failed`, error.stack, 'deleteEmployee');
      throw error;
    }
  }
}
