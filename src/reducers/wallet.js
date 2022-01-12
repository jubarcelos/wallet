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
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.payload,
      }],
      totalExpenses: action.payload.totalExpenses,
    };
  default:
    return state;
  }
};

export default wallet;
