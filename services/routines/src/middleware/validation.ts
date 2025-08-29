import { Request, Response, NextFunction } from 'express';

/**
 * Validates the request body for creating a routine
 */
export const validateRoutineCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, difficulty } = req.body;

  const errors = [];

  if (!name) {
    errors.push({ field: 'name', message: 'Routine name is required' });
  }

  if (!category) {
    errors.push({ field: 'category', message: 'Routine category is required' });
  } else if (
    !['strength', 'running', 'cycling', 'swimming', 'other'].includes(category)
  ) {
    errors.push({
      field: 'category',
      message:
        'Category must be one of: strength, running, cycling, swimming, other',
    });
  }

  if (!difficulty) {
    errors.push({
      field: 'difficulty',
      message: 'Routine difficulty is required',
    });
  } else if (!['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
    errors.push({
      field: 'difficulty',
      message: 'Difficulty must be one of: beginner, intermediate, advanced',
    });
  }

  if (errors.length > 0) {
    return res.status(422).json({
      type: 'https://api.peakhealth.com/errors/validation-error',
      title: 'Validation Error',
      status: 422,
      detail: 'The request body contains invalid data.',
      instance: req.originalUrl,
      errors,
    });
  }

  next();
};

/**
 * Validates the request body for updating a routine
 */
export const validateRoutineUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, difficulty } = req.body;
  const errors = [];

  // Only validate fields that are present in the request body
  if (
    category &&
    !['strength', 'running', 'cycling', 'swimming', 'other'].includes(category)
  ) {
    errors.push({
      field: 'category',
      message:
        'Category must be one of: strength, running, cycling, swimming, other',
    });
  }

  if (
    difficulty &&
    !['beginner', 'intermediate', 'advanced'].includes(difficulty)
  ) {
    errors.push({
      field: 'difficulty',
      message: 'Difficulty must be one of: beginner, intermediate, advanced',
    });
  }

  if (errors.length > 0) {
    return res.status(422).json({
      type: 'https://api.peakhealth.com/errors/validation-error',
      title: 'Validation Error',
      status: 422,
      detail: 'The request body contains invalid data.',
      instance: req.originalUrl,
      errors,
    });
  }

  next();
};
