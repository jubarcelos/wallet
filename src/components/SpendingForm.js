import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setWalletSpending } from '../actions';

class SpendingForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      cause: '',
      currency: '',
      isButtonDisabled: true,
    };
  }

  ableButton = () => {
    const { value, cause, currency } = this.state;

    if (value && cause && currency) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.ableButton(); });
  }

  onClicked = (e) => {
    const { id, value, cause, currency } = this.state;
    e.preventDefault();
    const { dispatchSetValue } = this.props;
    dispatchSetValue({
      expenses: { id, value, cause, currency },
      currencies: { currency },
    });
  }

  render() {
    const { isButtonDisabled, value, cause, currency } = this.state;
    return (
      <form
        action="insertSpend"
        method="POST"
        onSubmit={ this.onClicked }
      >
        <input
          data-testid="value-input"
          placeholder="Valor gasto"
          onChange={ this.handleChange }
          value={ value }
          name="value"
          required
        />
        <input
          data-testid="description-input"
          placeholder="Qual a causa do gasto"
          onChange={ this.handleChange }
          value={ cause }
          name="cause"
          required
        />
        <input
          data-testid="currency-input"
          placeholder="Em que moeda"
          onChange={ this.handleChange }
          value={ currency }
          name="currency"
          required
        />
        <select data-testid="method-input">
          Forma de pagamento:
          <option name="payment" value="Dinheiro"> Dinheiro </option>
          <option name="payment" value="Crédito"> Cartão de crédito </option>
          <option name="payment" value="Débito"> Cartão de débito </option>
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
          disabled={ isButtonDisabled }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (userData) => dispatch(setWalletSpending(userData)),
}
);

export default connect(null, mapDispatchToProps)(SpendingForm);

SpendingForm.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
};
