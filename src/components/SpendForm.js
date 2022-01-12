import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setWalletSpending, getCurrenciesData } from '../actions';

class SpendForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      cause: '',
      method: '',
      currency: '',
      tag: '',
    };
  }

  componentDidMount() {
    getCurrenciesData();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onClicked = (e) => {
    const { id, value, cause, method, currency, tag } = this.state;
    e.preventDefault();
    const { dispatchSetSpend } = this.props;
    dispatchSetSpend({
      expenses: { id, value, cause, method, currency, tag },
    });
  }

  render() {
    const {
      state: value, cause, method, currency, tag
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

    return (
      <form
        action="insertSpend"
        method="POST"
        onSubmit={ this.onClicked }
      >
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            placeholder="Gasto realizado"
            onChange={ this.handleChange }
            value={ value }
            name="value"
            type="number"
          />
        </label>
        <label htmlFor="cause">
          <input
            data-testid="description-input"
            placeholder="Motivo"
            onChange={ this.handleChange }
            value={ cause }
            name="cause"
            type="text"
          />
        </label>

        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
          required
        >
          <option value="BRL">BRL</option>
          <option value="defaultSelect" disabled hidden>Selecione uma moeda</option>
          { currencies.map((optionSelected) => (
            <option
              data-testid={ optionSelected }
              key={ `currency- ${ optionSelected }` }
              value={ optionSelected }
            >
              { optionSelected }
            </option>
          )) }
        </select>

        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
          value={ method }
        >
          Forma de pagamento:
          <option value="defaultSelect" disabled hidden>Método de pagamento</option>
          <option name="method" value="Dinheiro"> Dinheiro </option>
          <option name="method" value="Crédito"> Cartão de crédito </option>
          <option name="method" value="Débito"> Cartão de débito </option>
        </select>
        <select data-testid="tag-input">
          Tag:
          <option name="tag" value="Alimentação"> Alimentação </option>
          <option name="tag" value="Lazer"> Lazer </option>
          <option name="tag" value="Trabalho"> Trabalho </option>
          <option name="tag" value="Transporte"> Transporte </option>
          <option name="tag" value="Saúde"> Saúde </option>
        </select>
        <button
          type="submit"
          className="newSpendButton"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchSetSpend: (userData) => dispatch(setWalletSpending(userData)),
  fetchCurrencies: () => dispatch(getCurrenciesData()),
}
);

export default connect(null, mapDispatchToProps)(SpendForm);

SpendForm.propTypes = {
  dispatchSetSpend: PropTypes.func.isRequired,
};
