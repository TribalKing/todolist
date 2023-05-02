export interface ApiResponse<T> {
  data: T;
}

class ApiService {
  private baseURL: string | undefined;
  private headers: Headers;
  private port: string | undefined;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || "http://localhost";
    this.port = process.env.REACT_APP_API_PORT || "5000";
    this.headers = new Headers();
    this.headers.append("Accept", "application/json");
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    const headers = new Headers(this.headers);

    const response = await fetch(`${this.baseURL}:${this.port}/${url}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  }

  async post<T>(
    url: string,
    data: {
      [key: string]: unknown;
    }
  ): Promise<ApiResponse<T>> {
    const headers = new Headers(this.headers);
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${this.baseURL}:${this.port}/${url}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData;
  }

  async put<T>(
    url: string,
    data: {
      [key: string]: unknown;
    },
    id?: number
  ): Promise<ApiResponse<T>> {
    const headers = new Headers(this.headers);
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`${this.baseURL}:${this.port}/${url}/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const responseData = await response.json();
    return responseData.data;
  }
}

export default ApiService;
