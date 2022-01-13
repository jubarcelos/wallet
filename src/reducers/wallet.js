// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENT_PRICE_VALUE, SET_WALLET_SPENDING } from '../actions';

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
      expenses: [...state.expenses, { ...action.payload, id: state.controlId }],
      controlId: state.controlId + 1,
    };
  case CURRENT_PRICE_VALUE:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
