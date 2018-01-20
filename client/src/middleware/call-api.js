// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// Redux middleware for handling actions that have CALL_API specified
export default store => next => action => {
  const callAPI = action[CALL_API];
  // Pass along actions that aren't for this middleware
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, call } = callAPI;

  // Validate that the action has three types (request, success, and failure)
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }
  // Validate that the action has a function to call (an API fetch)
  if (!call || typeof call !== 'function') {
    throw new Error('Expected a call function to execute.');
  }

  // Shorthand for the actions we'll dispatch along the way
  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  // The request is dispatched immediately
  next(actionWith({ type: requestType }));

  call().then(
    response =>
      next(
        actionWith({
          type: successType,
          response
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error
        })
      )
  );
};
