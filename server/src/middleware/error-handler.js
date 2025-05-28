const { StatusCodes } = require('http-status-codes');
const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };

  if (err instanceof ValidationError) {
    customError.message = err.errors.map((item) => item.message).join(',');
    customError.statusCode = 400;
  }

  if (err instanceof UniqueConstraintError) {
    customError.message = `Duplicate value entered for ${err.errors[0].path} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err instanceof ForeignKeyConstraintError) {
    customError.message = `Invalid foreign key value for ${err.fields[0]}`;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;