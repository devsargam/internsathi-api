// Improves the readability of the error messages given by mongoose validation
export function betterErrors(error) {
  let errors = { ...error.errors };
  // Duplicate key error
  if (error.code === 11000) {
    const key = Object.keys(error.keyValue)[0];
    errors[key] = `${key} already exists`;
    return errors;
  }

  // Validation errors
  Object.keys(errors).forEach((key) => {
    errors[key] = errors[key].message;
  });
  return errors;
}
