import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesData } from '../actions';

class SpendForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      payment: 0,
      cause: '',
      method: 'Dinheiro',
      currency: 'BRL',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  // setExchangeRatesState = () => {
  //   this.setState({
  //     exchangeRates: fetchCurrencies(),
  //   });
  // }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onClicked = (e) => {
    const { id, payment, cause, method, currency, tag } = this.state;
    e.preventDefault();
    const { dispatchSetSpend } = this.props;
    dispatchSetSpend({
      id, payment, cause, method, currency, tag,
    });
    // dispatchSetCurrencies({

    // })
  }

  render() {
    const {
      state: method, currency, tag,
    } = this;

    const currencies = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];
    const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <input
          data-testid="value-input"
          placeholder="Valor gasto"
          name="payment"
          type="number"
          onChange={ this.handleChange }
          id="payment"
        />
        <input
          data-testid="description-input"
          placeholder="Motivo"
          name="cause"
          onChange={ this.handleChange }
          type="text"
          id="cause"
          required
        />
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            placeholder="Moeda de pagamento"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            required
          >
            { currencies.map((optionSelected) => (
              <option
                data-testid={ optionSelected }
                key={ `currency- ${optionSelected}` }
                value={ optionSelected }
              >
                { optionSelected }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            placeholder="Forma de pagamento"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            { payments.map((payMethod) => (
              <option
                key={ payMethod }
                value={ payMethod }
              >
                { payMethod }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            placeholder="Tag de compra"
            value={ tag }
          >
            { tags.map((payTag) => (
              <option
                key={ payTag }
                value={ payTag }
              >
                { payTag }
              </option>
            )) }
          </select>
        </label>
        <button
          type="button"
          onClick={ this.onClicked }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  // fetchCurrencies: () => dispatch(getCurrenciesData()),
  dispatchSetSpend: (spend) => dispatch(getCurrenciesData(spend)),
}
);

export default connect(null, mapDispatchToProps)(SpendForm);

SpendForm.propTypes = {
  dispatchSetSpend: PropTypes.func.isRequired,
  // fetchCurrencies: PropTypes.func.isRequired,
};
