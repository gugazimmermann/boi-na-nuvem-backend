import { ResponseHelper } from './response.helper';
import { ApiResponse } from '../interfaces/api-response.interface';

describe('ResponseHelper', () => {
  describe('success', () => {
    it('should create a success response with data and message', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'Operation successful';
      
      const result = ResponseHelper.success(data, undefined, message);
      
      expect(result).toEqual({
        success: true,
        data,
        message,
      });
    });

    it('should create a success response with data, count, and message', () => {
      const data = { id: 1, name: 'Test' };
      const count = 1;
      const message = 'Operation successful';
      
      const result = ResponseHelper.success(data, count, message);
      
      expect(result).toEqual({
        success: true,
        data,
        count,
        message,
      });
    });

    it('should auto-calculate count for array data when count is not provided', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const message = 'Array operation successful';
      
      const result = ResponseHelper.success(data, undefined, message);
      
      expect(result).toEqual({
        success: true,
        data,
        count: 3,
        message,
      });
    });

    it('should not auto-calculate count for non-array data when count is not provided', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'Single item operation successful';
      
      const result = ResponseHelper.success(data, undefined, message);
      
      expect(result).toEqual({
        success: true,
        data,
        count: undefined,
        message,
      });
    });

    it('should create a success response with only data', () => {
      const data = { id: 1, name: 'Test' };
      
      const result = ResponseHelper.success(data);
      
      expect(result).toEqual({
        success: true,
        data,
        count: undefined,
        message: undefined,
      });
    });
  });

  describe('successWithCount', () => {
    it('should create a success response with array data and count', () => {
      const data = [{ id: 1 }, { id: 2 }];
      const message = 'Array operation successful';
      
      const result = ResponseHelper.successWithCount(data, message);
      
      expect(result).toEqual({
        success: true,
        data,
        count: 2,
        message,
      });
    });

    it('should create a success response with empty array', () => {
      const data: any[] = [];
      const message = 'Empty array operation successful';
      
      const result = ResponseHelper.successWithCount(data, message);
      
      expect(result).toEqual({
        success: true,
        data,
        count: 0,
        message,
      });
    });

    it('should create a success response without message', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      
      const result = ResponseHelper.successWithCount(data);
      
      expect(result).toEqual({
        success: true,
        data,
        count: 3,
        message: undefined,
      });
    });
  });

  describe('successSingle', () => {
    it('should create a success response for single item with message', () => {
      const data = { id: 1, name: 'Test' };
      const message = 'Single item operation successful';
      
      const result = ResponseHelper.successSingle(data, message);
      
      expect(result).toEqual({
        success: true,
        data,
        message,
      });
    });

    it('should create a success response for single item without message', () => {
      const data = { id: 1, name: 'Test' };
      
      const result = ResponseHelper.successSingle(data);
      
      expect(result).toEqual({
        success: true,
        data,
        message: undefined,
      });
    });

    it('should create a success response for null data', () => {
      const data = null;
      const message = 'Delete operation successful';
      
      const result = ResponseHelper.successSingle(data, message);
      
      expect(result).toEqual({
        success: true,
        data: null,
        message,
      });
    });

    it('should create a success response for undefined data', () => {
      const data = undefined;
      const message = 'Operation successful';
      
      const result = ResponseHelper.successSingle(data, message);
      
      expect(result).toEqual({
        success: true,
        data: undefined,
        message,
      });
    });
  });

  describe('type safety', () => {
    it('should maintain type safety for different data types', () => {
      // String data
      const stringResult = ResponseHelper.successSingle('test string');
      expect(stringResult.data).toBe('test string');

      // Number data
      const numberResult = ResponseHelper.successSingle(42);
      expect(numberResult.data).toBe(42);

      // Boolean data
      const booleanResult = ResponseHelper.successSingle(true);
      expect(booleanResult.data).toBe(true);

      // Object data
      const objectResult = ResponseHelper.successSingle({ key: 'value' });
      expect(objectResult.data).toEqual({ key: 'value' });

      // Array data
      const arrayResult = ResponseHelper.successWithCount([1, 2, 3]);
      expect(arrayResult.data).toEqual([1, 2, 3]);
      expect(arrayResult.count).toBe(3);
    });
  });
});
