import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Header extends React.Component {
  render() {
    const { props: { email, exchange, totalExpenses } } = this;
    return (
      <header>
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <span data-testid="email-field">
          { `User e-mail: ${email}` }
        </span>
        <span data-testid="total-field">
          { totalExpenses }
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
});
export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  exchange: PropTypes.string,
  totalExpenses: PropTypes.number,
};

Header.defaultProps = {
  exchange: 'BRL',
  totalExpenses: 0,
};
