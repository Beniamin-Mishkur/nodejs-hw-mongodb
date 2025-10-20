import { HttpError } from 'http-errors';

const handleMongooseError = (err) => {
  if (err.name === 'CastError') {
    return {
      status: 404,
      message: 'Not found',
    };
  }
  if (err.name === 'ValidationError') {
    return {
      status: 400,
      message: 'Bad Request: Validation failed',
    };
  }

  return {
    status: 500,
    message: 'Something went wrong',
  };
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  const { status, message } = handleMongooseError(err);

  if (status !== 500) {
    res.status(status).json({
      status: status,
      message: message,
      data: err.message,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
