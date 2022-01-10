import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPersonalValue } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  ableButton = () => {
    const MIN_LENGTH = 6;
    const { email, password } = this.state;

    if (password.length >= MIN_LENGTH && email.includes('@') && email.includes('.com')) {
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
    const { email } = this.state;
    e.preventDefault();
    const { history, dispatchSetValue } = this.props;
    dispatchSetValue({ email });
    history.push('/carteira');
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;

    return (
      <form action="login" method="POST" onSubmit={ this.onClicked }>
        <div>
          <input
            label="email"
            data-testid="email-input"
            // className="form-control"
            id="email-input"
            type="email"
            placeholder="name@example.com"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            required
          />
        </div>
        <div>
          <input
            label="password"
            data-testid="password-input"
            // className="form-control"
            id="password-input"
            type="password"
            placeholder=" digite sua senha"
            onChange={ this.handleChange }
            value={ password }
            name="password"
            required
            minLength="6"
          />
        </div>
        <div>
          <button
            type="submit"
            className="checkInButton"
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (userData) => dispatch(setPersonalValue(userData)),
}
);

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes).isRequired,
  dispatchSetValue: PropTypes.func.isRequired,
};
