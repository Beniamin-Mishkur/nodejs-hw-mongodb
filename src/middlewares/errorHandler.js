// src/middlewares/errorHandler.js
import createHttpError from 'http-errors';

const handleMongooseError = (err) => {
  if (err.name === 'CastError') {
    return {
      status: 404,
      message: 'Not found',
      data: {},
    };
  }
  if (err.name === 'ValidationError') {
    return {
      status: 400,
      message: 'Bad Request: Validation failed',
      data: err.errors || {},
    };
  }

  return null;
};

export const errorHandler = (err, req, res, next) => {
  // Mongoose-specific handling
  const mongooseResult = handleMongooseError(err);
  if (mongooseResult) {
    return res.status(mongooseResult.status).json(mongooseResult);
  }

  // http-errors (created with createHttpError)
  if (createHttpError.isHttpError(err)) {
    const status = err.status || 500;
    const data = err.data && typeof err.data === 'object' ? err.data : {};
    return res.status(status).json({
      status,
      message: err.message || 'Error',
      data,
    });
  }

  // Default fallback
  console.error('Unhandled error', err);
  return res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: {},
  });
};
