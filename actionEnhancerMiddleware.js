import invariant from 'invariant';

const isSimpleAction = (action) => {
  if (typeof action === 'function') {
    return false;
  }
  if (
    action === null ||
    action === undefined ||
    typeof action !== 'object'
  ) {
    return false;
  }
  return true;
}

const actionEnhancerMiddleware = options => {
  let {filter, enhancer} = options;
  invariant(
    typeof filter === 'function',
    'actionEnhancerMiddleware filter option must be a function'
  );
  invariant(
    typeof enhancer === 'function' || typeof enhancer === 'undefined',
    'actionEnhancerMiddleware enhancer option must be a function'
  );

  if (typeof filter !== 'function') filter = () => true;

  return store => next => action => {
    if (isSimpleAction(action) && filter(action)) {
      const {dispatch, getState} = store;
      return next(enhancer(dispatch, getState, action));
    }
    return next(action);
  }
}
export default actionEnhancerMiddleware;
