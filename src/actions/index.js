// Coloque aqui suas actions

export const SET_PERSONAL_VALUE = 'SET_PERSONAL_VALUE';
export const SET_WALLET_SPENDING = 'SET_WALLET_SPENDING';
export const CURRENT_PRICE_VALUE = 'CURRENT_PRICE_VALUE';
export const FAIL_REQUEST = 'FAIL_REQUEST';
export const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
export const REQUEST = 'REQUEST';
export const EXCLUDE_EXPENSE = 'EXCLUDE_EXPENSE';

const URL = 'https://economia.awesomeapi.com.br/json/all';

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

export const fetchCurrencyList = (payload) => (
  {
    type: CURRENT_PRICE_VALUE, payload,
  }
);

export const failRequest = (err) => (
  {
    type: FAIL_REQUEST, err,
  }
);

export const excludeExpense = (id) => ({
  type: EXCLUDE_EXPENSE,
  id,
});

export const getCurrenciesData = (spend) => (dispatch) => {
  fetch(URL)
    .then((response) => response.json())
    .then((currencyPrice) => {
      dispatch(setWalletSpending({
        ...spend, exchangeRates: currencyPrice,
      }));
    })
    .catch((err) => failRequest(err));
};

export const getAPIData = () => (dispatch) => {
  fetch(URL)
    .then((response) => response.json())
    .then((currency) => dispatch(fetchCurrencyList(Object.keys(currency)
      .filter((coin) => coin !== 'USDT'))))
    .catch((err) => failRequest(err));
};
