import React from 'react'
import App from './App';
import { AuthService, AuthProvider} from 'react-oauth2-pkce'

import './App.css';

const authService = new AuthService({
  clientId: 'oidc-client',
  authorizeEndpoint: 'http://localhost:8090/auth/realms/oidc-realm/protocol/openid-connect/auth',
  tokenEndpoint: 'http://localhost:8090/auth/realms/oidc-realm/protocol/openid-connect/token',
  logoutEndpoint: 'http://localhost:8090/auth/realms/oidc-realm/protocol/openid-connect/logout',
  redirectUri: 'http://localhost/new',
  location: window.location,
  provider: 'http://localhost:8090/auth/realms/oidc-realm/protocol/openid-connect/auth',
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
