// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_WALLET_SPENDING } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  exchange: 'BRL',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_WALLET_SPENDING:
    return {
      ...state,
      currencies: action.payload.wallet.currencies,
      expenses: action.payload.wallet.expenses,
      totalExpenses: action.payload.wallet.totalExpenses,
      exchange: action.payload.wallet.exchange,
    };
  default:
    return state;
  }
};

export default wallet;
