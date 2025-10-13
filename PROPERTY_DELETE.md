# Funcionalidade de Delete de Propriedades

## Implementação de Soft Delete

O sistema implementa **soft delete** para propriedades, ou seja, as propriedades não são removidas fisicamente do sistema, mas marcadas como deletadas.

## Endpoints Implementados

### 1. DELETE /property/:id
**Deleta uma propriedade (soft delete)**

#### Requisição
```bash
DELETE /property/550e8400-e29b-41d4-a716-446655440001
Authorization: Bearer <jwt-token>
```

#### Resposta de Sucesso
```json
{
  "success": true,
  "message": "Property deleted successfully",
  "data": null
}
```

#### Resposta de Erro (Propriedade não encontrada)
```json
{
  "success": true,
  "message": "Property not found",
  "data": null
}
```

#### Resposta de Erro (Já deletada)
```json
{
  "success": true,
  "message": "Property is already deleted",
  "data": null
}
```

### 2. POST /property/:id/restore
**Restaura uma propriedade deletada**

#### Requisição
```bash
POST /property/550e8400-e29b-41d4-a716-446655440001/restore
Authorization: Bearer <jwt-token>
```

#### Resposta de Sucesso
```json
{
  "success": true,
  "message": "Property restored successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Fazenda do Juca",
    "city": "São João do Itaperiú",
    "state": "SC",
    "status": "active",
    "deletedAt": null,
    "createdAt": "2024-01-15T10:00:00Z"
    // ... outros campos
  }
}
```

## Como Funciona o Soft Delete

### 1. Processo de Delete
Quando uma propriedade é deletada:
- **`deletedAt`**: Recebe a data/hora atual da exclusão
- **`status`**: É alterado para `INACTIVE`
- **Dados preservados**: Todos os outros dados são mantidos

### 2. Filtros Automáticos
- **`getAllProperties()`**: Retorna apenas propriedades não deletadas
- **`getPropertyById()`**: Retorna erro se a propriedade foi deletada
- **`updateProperty()`**: Não permite atualizar propriedades deletadas

### 3. Processo de Restauração
Quando uma propriedade é restaurada:
- **`deletedAt`**: É definido como `null`
- **`status`**: É alterado para `ACTIVE`
- **Dados preservados**: Todos os dados originais são mantidos

## Exemplo Prático

### Propriedade Original
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Fazenda do Juca",
  "city": "São João do Itaperiú",
  "state": "SC",
  "status": "active",
  "deletedAt": null,
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Após DELETE
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Fazenda do Juca",
  "city": "São João do Itaperiú",
  "state": "SC",
  "status": "inactive", // ✅ Alterado
  "deletedAt": "2024-12-19T15:30:00Z", // ✅ Adicionado
  "createdAt": "2024-01-15T10:00:00Z" // ✅ Preservado
}
```

### Após RESTORE
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Fazenda do Juca",
  "city": "São João do Itaperiú",
  "state": "SC",
  "status": "active", // ✅ Restaurado
  "deletedAt": null, // ✅ Removido
  "createdAt": "2024-01-15T10:00:00Z" // ✅ Preservado
}
```

## Logs do Sistema

### Delete
```
[PropertyService] Deleting property with id: 550e8400-e29b-41d4-a716-446655440001
[PropertyService] Property 550e8400-e29b-41d4-a716-446655440001 marked as deleted at 2024-12-19T15:30:00Z
```

### Restore
```
[PropertyService] Restoring property with id: 550e8400-e29b-41d4-a716-446655440001
[PropertyService] Property 550e8400-e29b-41d4-a716-446655440001 restored successfully
```

## Validações de Segurança

### Delete
- ✅ Verifica se a propriedade existe
- ✅ Verifica se a propriedade já foi deletada
- ✅ Preserva todos os dados originais
- ✅ Registra data/hora da exclusão

### Restore
- ✅ Verifica se a propriedade existe
- ✅ Verifica se a propriedade está deletada
- ✅ Restaura status para ativo
- ✅ Remove marca de exclusão

## Vantagens do Soft Delete

1. **Recuperação de Dados**: Propriedades podem ser restauradas
2. **Auditoria**: Mantém histórico de exclusões
3. **Integridade**: Preserva relacionamentos com outros dados
4. **Segurança**: Evita perda acidental de dados
5. **Compliance**: Atende requisitos de retenção de dados

## Status Codes HTTP

- **200**: Operação realizada com sucesso
- **404**: Propriedade não encontrada
- **401**: Token de autenticação inválido
- **500**: Erro interno do servidor
