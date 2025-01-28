export function BadRequestError(message) {
    return { type: 'bad_request', message };
  }
  
  export function NotFoundError(message) {
    return { type: 'not_found', message };
  }
  
  export function ConflictError(message) {
    return { type: 'conflict', message };
  }
  
  export function UnprocessableEntityError(message) {
    return { type: 'unprocessable_entity', message };
  }
  
  export function InternalServerError(message = 'Internal Server Error') {
    return { type: 'internal_error', message };
  }
  