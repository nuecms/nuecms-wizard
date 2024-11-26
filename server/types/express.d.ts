import 'express';

declare module 'express' {
  export interface Response {
    /**
     * Resolves a response with the given data and HTTP status code.
     * @param data - The data to send in the response. Can be any type.
     * @param status - The HTTP status code to set for the response. Defaults to 200.
     */
    resolve(data: any, status?: number): void;

    /**
     * Sends a successful response with the given data and HTTP status code.
     * @param data - The data to send in the response. Can be any type.
     * @param status - The HTTP status code to set for the response. Defaults to 200.
     */
    success(data: any, status?: number): void;

    /**
     * Sends a failure response with the given data and HTTP status code.
     * @param data - The data to send in the response. Can be any type.
     * @param status - The HTTP status code to set for the response. Defaults to 200.
     */
    fail(data: any, status?: number): void;
  }
}
