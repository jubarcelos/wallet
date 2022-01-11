import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Header extends React.Component {
  render() {
    const { props: email } = this;

    return (
      <header>
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <span data-testid="email-field">
          { `User e-mail: ${{ email }}` }
        </span>
        <span data-testid="total-field">
          0
        </span>
        <span>
          { ' ' }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
