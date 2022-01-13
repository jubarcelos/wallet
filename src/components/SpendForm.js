import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesData, getAPIData } from '../actions';

class SpendForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      payment: 0,
      cause: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

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
  }

  render() {
    const {
      state: method, tag,
      props: currencies,
    } = this;

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
            onChange={ this.handleChange }
          >
            {/* pedir ajuda para resolver o problema do primeiro input tbm. */}
            { currencies.currencies.map((optionSelected, index) => (
              <option
                data-testid={ optionSelected }
                key={ index }
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
  fetchCurrencies: () => dispatch(getAPIData()),
  dispatchSetSpend: (spend) => dispatch(getCurrenciesData(spend)),
}
);

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendForm);

SpendForm.propTypes = {
  dispatchSetSpend: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
