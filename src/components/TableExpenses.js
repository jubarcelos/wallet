import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Referencia: https://www.delftstack.com/pt/howto/javascript/create-table-javascript/#:~:text=Para%20criar%20um%20elemento%20HTML,createElement('table')%20.

class TableExpenses extends Component {
  // const buttonExcluir = <button type="buttonExcluir" id="buttonExcluir" data-testid="delete-btn">
  //   ![image](btnExcluir.gif)
  // </button>;

  render() {
    const { expenses } = this.props;
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
              expenses && (expenses.map((expense) => (
                (
                  <tr key={ expense.id }>
                    <th>#</th>
                    <td>{ expense.description }</td>
                    <td>{ expense.tag }</td>
                    <td>{ expense.method }</td>
                    <td>{ expense.value }</td>
                    <td>{ expense.exchangeRates[expense.currency].name }</td>
                    <td>
                      {
                        Number(expense.exchangeRates[expense.currency].ask)
                          .toFixed(2)
                      }
                    </td>
                    <td>
                      {
                        (Number(expense.exchangeRates[expense.currency].ask)
                          * Number(expense.value)).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
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

export default connect(mapStateToProps)(TableExpenses);

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
