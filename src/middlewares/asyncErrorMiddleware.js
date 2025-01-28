export function asyncError(handler) {
  return async function (req, res, next) {
    await handler(req, res, next).catch(next); 
  };
}
