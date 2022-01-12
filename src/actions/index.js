// Coloque aqui suas actions

export const SET_PERSONAL_VALUE = 'SET_PERSONAL_VALUE';
export const SET_WALLET_SPENDING = 'SET_WALLET_SPENDING';
export const CURRENT_PRICE_VALUE = 'CURRENT_PRICE_VALUE';
export const FAIL_REQUEST = 'FAIL_REQUEST';
export const SUCCESS_REQUEST = 'SUCCESS_REQUEST';
export const REQUEST = 'REQUEST';

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

const request = () => ({
  type: REQUEST,
});

const successRequest = (payload) => (
  {
    type: CURRENT_PRICE_VALUE, payload,
  }
);

const failRequest = (err) => (
  {
    type: FAIL_REQUEST, err,
  }
);

export function fetchAPI() {
  return (
    fetch(URL)
      .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))));
}

export const getCurrenciesData = () => (dispatch) => {
  dispatch(request());
  fetchAPI()
    .then((payload) => dispatch(successRequest(payload)))
    .catch(() => dispatch(failRequest()));
};
