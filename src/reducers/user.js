// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_PERSONAL_VALUE } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PERSONAL_VALUE:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default user;
