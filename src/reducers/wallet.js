// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_WALLET_SPENDING } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_WALLET_SPENDING:
    return {
      ...state,
      currencies: action.payload.wallet.currencies,
      expenses: action.payload.wallet.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
