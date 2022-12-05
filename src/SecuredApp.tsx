import React from 'react'
import App from './App';
import { AuthService, AuthProvider} from 'react-oauth2-pkce'

import './App.css';

const authService = new AuthService({
  clientId: 'oidc-client',
  authorizeEndpoint: 'https://localhost/auth/realms/oidc-realm/protocol/openid-connect/auth',
  tokenEndpoint: 'https://localhost/auth/realms/oidc-realm/protocol/openid-connect/token',
  logoutEndpoint: 'https://localhost/auth/realms/oidc-realm/protocol/openid-connect/logout',
  redirectUri: 'http://localhost:8080/new',
  location: window.location,
  provider: 'https://localhost/auth/realms/oidc-realm/protocol/openid-connect/auth',
  scopes: ['openid']
});

class SecuredApp extends React.Component {

  public render() {
    return (
      <AuthProvider authService={authService}>
        <App />
      </AuthProvider>
    )
  }
}

export default SecuredApp
