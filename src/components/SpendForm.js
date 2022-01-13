import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesData, getAPIData } from '../actions';

const alimento = 'Alimentação';

class SpendForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      tag: 'alimento',
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
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

  onClicked = () => {
    const { id, value, description, method, currency, tag } = this.state;
    const { dispatchSetSpend } = this.props;
    dispatchSetSpend({
      id, value, description, method, currency, tag,
    });
    this.setState({
      value: 0,
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: alimento,
    });
  }

  render() {
    const {
      state: { method, tag, description, value },
      props: { currencies },
    } = this;
    const payments = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = [alimento, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <input
          data-testid="value-input"
          placeholder="Valor gasto"
          name="value"
          type="number"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          placeholder="Motivo"
          name="description"
          onChange={ this.handleChange }
          value={ description }
          type="text"
        />
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            placeholder="Moeda de pagamento"
            name="currency"
            onChange={ this.handleChange }
            id="currency"
          >
            {/* pedir ajuda para resolver o problema do testId desse input tbm. */ }
            { currencies.map((optionSelected) => (
              <option
                data-testid={ optionSelected }
                key={ optionSelected }
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
            id="method"

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
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            id="tag"
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
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
