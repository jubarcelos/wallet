// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_WALLET_SPENDING } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchange: 'BRL',
  controlId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_WALLET_SPENDING:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.controlId + 1 }],
      controlId: state.controlId + 1,
    };
  default:
    return state;
  }
};

export default wallet;
