# Atualização de Propriedade com Dados Climáticos

## Funcionalidade Implementada

O endpoint `PUT /property/:id` agora detecta automaticamente quando a cidade de uma propriedade é alterada e busca novos dados climáticos e de pastagem para a nova localização.

## Como Funciona

### Atualização de Dados
O sistema faz uma **atualização parcial** da propriedade:
- **Mantém** todos os dados existentes que não foram fornecidos na requisição
- **Atualiza** apenas os campos fornecidos na requisição
- **Preserva** campos importantes como `id` e `createdAt`

### Detecção de Mudanças
O sistema verifica se houve mudança em:
- **Cidade**: Compara a cidade atual com a nova cidade fornecida
- **Coordenadas**: Verifica se latitude ou longitude foram alteradas

### Busca de Dados Climáticos
Quando uma mudança é detectada:
1. **Dados Climáticos**: Busca dados históricos de temperatura e precipitação da nova localização
2. **Planejamento de Pastagem**: Gera novo planejamento usando IA (OpenAI) baseado nos dados climáticos
3. **Atualização**: Substitui apenas os dados climáticos antigos pelos novos na propriedade

## Exemplo de Uso

### Propriedade Original
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Fazenda do Juca",
  "city": "São João do Itaperiú",
  "state": "SC",
  "latitude": -26.5593843,
  "longitude": -48.7587542,
  "description": "Propriedade principal para criação de gado",
  "street": "Rua Simão Piaz",
  "number": "S/N",
  "neighborhood": "Porto",
  "zipCode": "88395-000",
  "status": "active",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Requisição (Atualização Parcial)
```bash
PUT /property/550e8400-e29b-41d4-a716-446655440001
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "name": "Fazenda do Juca Atualizada",
  "city": "Florianópolis",
  "latitude": -27.5954,
  "longitude": -48.5480
}
```

### Resposta (Dados Mesclados)
```json
{
  "success": true,
  "message": "Property updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Fazenda do Juca Atualizada", // ✅ Atualizado
    "city": "Florianópolis", // ✅ Atualizado
    "state": "SC", // ✅ Mantido do original
    "latitude": -27.5954, // ✅ Atualizado
    "longitude": -48.5480, // ✅ Atualizado
    "description": "Propriedade principal para criação de gado", // ✅ Mantido do original
    "street": "Rua Simão Piaz", // ✅ Mantido do original
    "number": "S/N", // ✅ Mantido do original
    "neighborhood": "Porto", // ✅ Mantido do original
    "zipCode": "88395-000", // ✅ Mantido do original
    "status": "active", // ✅ Mantido do original
    "createdAt": "2024-01-15T10:00:00Z", // ✅ Mantido do original
    "pasturePlanning": [ // ✅ Novos dados climáticos gerados
      {
        "month": "January",
        "precipitation": 185.2,
        "temperature": 26.8,
        "state": "Good"
      },
      {
        "month": "February",
        "precipitation": 165.4,
        "temperature": 26.5,
        "state": "Good"
      }
      // ... outros meses com dados de Florianópolis
    ]
  }
}
```

## Logs do Sistema

O sistema registra logs detalhados para acompanhar o processo:

```
[PropertyService] Cidade ou coordenadas mudaram para propriedade 550e8400-e29b-41d4-a716-446655440001, buscando novos dados climáticos
[ClimateService] Buscando dados climáticos para coordenadas: -27.5954, -48.5480
[PropertyService] Gerando novo planejamento de pastagem para propriedade: 550e8400-e29b-41d4-a716-446655440001
[PropertyService] Novos dados climáticos e de pastagem obtidos com sucesso para propriedade 550e8400-e29b-41d4-a716-446655440001
```

## Tratamento de Erros

- **Dados climáticos indisponíveis**: Continua a atualização sem os dados climáticos
- **Erro na IA**: Usa dados climáticos básicos sem classificação de pastagem
- **Coordenadas inválidas**: Mantém dados climáticos atuais

## Campos que Disparam a Atualização

- `city`: Nome da cidade
- `latitude`: Latitude da propriedade
- `longitude`: Longitude da propriedade

## Campos que NÃO Disparam a Atualização

- `name`: Nome da propriedade
- `description`: Descrição
- `address`: Endereço
- `state`: Estado
- `zipCode`: CEP
- `status`: Status da propriedade

## Requisitos

- **OpenAI API Key**: Configurada na variável de ambiente `OPENAI_API_KEY`
- **Conexão com Internet**: Para buscar dados climáticos e processar com IA
- **Coordenadas válidas**: Latitude e longitude devem estar disponíveis
