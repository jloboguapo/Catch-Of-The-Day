import PropTypes from 'prop-types';
import React from 'react';

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Log in to manage your store's inventory</p>
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
