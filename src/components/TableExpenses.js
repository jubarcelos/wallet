import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { excludeExpense } from '../actions';

// Referencia: https://www.delftstack.com/pt/howto/javascript/create-table-javascript/#:~:text=Para%20criar%20um%20elemento%20HTML,createElement('table')%20.

class TableExpenses extends Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <div className="expenses-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses && (expenses.map(({
                id, description, tag, method, exchangeRates, currency, value,
              }) => (
                (
                  <tr key={ id }>
                    <th>#</th>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ value }</td>
                    <td>{ exchangeRates[currency].name }</td>
                    <td>
                      {
                        Number(exchangeRates[currency].ask)
                          .toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        (Number(exchangeRates[currency].ask)
                          * Number(value)).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        id={ id }
                        data-testid="delete-btn"
                        type="button"
                        aria-label="Delete"
                        onClick={ () => deleteExpense(id) }
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                )
              )))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(excludeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};
