// Coloque aqui suas actions

export const SET_PERSONAL_VALUE = 'SET_PERSONAL_VALUE';
export const SET_WALLET_SPENDING = 'SET_WALLET_SPENDING';

export const setPersonalValue = (payload) => (
  {
    type: SET_PERSONAL_VALUE, payload,
  }
);

export const setWalletSpending = (payload) => (
  {
    type: SET_WALLET_SPENDING, payload,
  }
);
