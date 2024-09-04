// asyncHandler is a higher-order function that wraps asynchronous route handlers
// in Express.js to automatically catch and forward errors to the error-handling middleware.

const asyncHandler = (fn) => (req, res, next) =>
  // Wrap the asynchronous function in a promise
  Promise.resolve(fn(req, res, next))
    // If the promise is rejected (an error occurs), catch it and pass it to the next middleware
    .catch(next);

// Export the asyncHandler function so it can be used in other parts of the application
export default asyncHandler;
