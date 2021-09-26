interface ErrorObject {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}

export class ServiceError extends Error {
  readonly statusCode: number;
  readonly message: string;

  constructor(error: ErrorObject) {
    super();
    this.statusCode = error.response?.data?.statusCode;
    this.message = error.response?.data?.message;
  }
}
