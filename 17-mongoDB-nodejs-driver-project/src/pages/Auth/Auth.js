import React, { Component } from 'react';

import './Auth.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

class AuthPage extends Component {
  state = { email: '', password: '' };

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    let modeButtonText = 'Switch to Signup';
    let submitButtonText = 'Login';
    if (this.props.mode === 'signup') {
      modeButtonText = 'Switch to Login';
      submitButtonText = 'Signup';
    }
    return (
      <main>
        <section className="auth__mode-control">
          <Button type="button" onClick={this.props.onAuthModeChange}>
            {modeButtonText}
          </Button>
        </section>
        <form
          className="auth__form"
          onSubmit={event =>
            this.props.onAuth(event, {
              email: this.state.email,
              password: this.state.password
            })
          }
        >
          <Input
            label="E-Mail"
            config={{ type: 'email' }}
            onChange={event => this.inputChangeHandler(event, 'email')}
          />
          <Input
            label="Password"
            config={{ type: 'password' }}
            onChange={event => this.inputChangeHandler(event, 'password')}
          />
          <Button type="submit">{submitButtonText}</Button>
        </form>
      </main>
    );
  }
}
export default AuthPage;
