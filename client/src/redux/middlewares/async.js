import { HTTP_REQUEST_IN_PROGRESS } from '../constants';

export default ({ dispatch }) => next => async action => {
  try {
    if (!action.payload || !action.payload.then) return next(action);
    dispatch({ type: HTTP_REQUEST_IN_PROGRESS, payload: true });
    const response = await action.payload;
    dispatch({ ...action, payload: response });
    dispatch({ type: HTTP_REQUEST_IN_PROGRESS, payload: false });
  } catch (ex) {
    dispatch({ type: HTTP_REQUEST_IN_PROGRESS, payload: false })
  }
}