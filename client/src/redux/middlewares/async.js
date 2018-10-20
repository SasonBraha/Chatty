import { HTTP_REQUEST_IN_PROGRESS } from '../constants';

export default ({ dispatch }) => next => action => {
  if (!action.payload || !action.payload.then) return next(action);
  dispatch({ type: HTTP_REQUEST_IN_PROGRESS, payload: true });
  action.payload.then(res => {
    dispatch({ ...action, payload: res });
    dispatch({ type: HTTP_REQUEST_IN_PROGRESS, payload: false });
  });
}