import { FETCH_ADMINS } from '../actions';

export default function(state = null, action){
  switch (action.type) {
    case FETCH_ADMINS:
      return action.payload.data;
    default:
      return state;
  }
};
