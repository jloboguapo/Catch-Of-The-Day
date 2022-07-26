import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory</p>
    <button
      type="submit"
      className="facebook"
      onClick={() => authenticate('Google')}
    >
      Log in with Google
    </button>
    <button
      type="submit"
      className="github"
      onClick={() => authenticate('Github')}
    >
      Log in with Github
    </button>
  </nav>
);

Login.propTypes = { authenticate: PropTypes.func.isRequired };

export default Login;
