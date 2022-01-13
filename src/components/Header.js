import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Header extends React.Component {
  totalExchangeSpend = () => {
    const { expenses } = this.props;
    return expenses.map((expense) => {
      const { payment, currency, exchangeRates } = expense;
      return Number(exchangeRates[currency].ask) * payment;
    }).reduce((acc, crr) => acc + crr, 0);
  }

  render() {
    const { props: { email, exchange } } = this;
    return (
      <header>
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <span data-testid="email-field">
          { `User e-mail: ${email}` }
        </span>
        <span data-testid="total-field">
          { `Despesa total: R$ ${this.totalExchangeSpend()}` }
        </span>
        <span data-testid="header-currency-field">
          { exchange }
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  exchange: state.wallet.exchange,
  totalExpenses: state.wallet.totalExpenses,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  exchange: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

Header.defaultProps = {
  exchange: 'BRL',
};
