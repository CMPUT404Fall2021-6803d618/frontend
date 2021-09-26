import { ServiceError } from "./ServiceError";

interface IErrorFactory {
  get: (err: any) => Error;
}

export const ErrorFactory: IErrorFactory = class {
  public static get(err: any) {
    if (err.response?.data) {
      return new ServiceError(err);
    } else {
      return new Error("Network Error");
    }
  }
};
