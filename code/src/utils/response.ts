import { Errors } from "moleculer";

const { MoleculerError, ValidationError } = Errors;

export const apiResponseError = (error: any) => {
  console.log(error);
  return new MoleculerError("Something went wrong!", 500, "ERR_SOMETHING");
};

export const apiResponseValidationError = (message: string, data?: any) => new ValidationError(message, "VALIDATION_ERROR", data);

export const apiResponseNotFoundError = (message: string) => new MoleculerError(message, 404, "RECORD_NOT_FOUND");
