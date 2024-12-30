import { ApiError } from "../utilities/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(ApiError.badRequest(error.message));
    }
    next();
  };
};

export default validate;
