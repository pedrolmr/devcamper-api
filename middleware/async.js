const asyncHandler = (fn) => () =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;