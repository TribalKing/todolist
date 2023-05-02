import { useState } from 'react';
import ApiService, { ApiResponse } from '../libs/api-service';

function useApi() {
  const [error, setError] = useState<Error | null>(null);
  const apiService = new ApiService();

  const get = async <T>(url: string): Promise<T> => {
    try {
      const response: ApiResponse<T> = await apiService.get<T>(url);
      return response as T;
    } catch (error: any) {
      setError(error);
      throw error;
    }
  };

  const post = async <T>(url: string, data: any): Promise<T> => {
    try {
      const response: ApiResponse<T> = await apiService.post<T>(url, data);
      return response as T;
    } catch (error: any) {
      setError(error);
      throw error;
    }
  };

  const put = async <T>(url: string, data: any, id: number): Promise<T> => {
    try {
      const response: ApiResponse<T> = await apiService.put<T>(url, data, id);
      return response as T;
    } catch (error: any) {
      setError(error);
      throw error;
    }
  };

  return { get, post, put, error };
}

export default useApi;