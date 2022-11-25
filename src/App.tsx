import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { DatasetService } from './services/DatasetService'
import { LoginService } from './services/LoginService'
import { Button } from 'react-bootstrap'
import { useAuth } from 'react-oauth2-pkce'

import './App.css';

interface AppState {
  data?: any
  username?: string
  password?: string
  // TODO: Find a way to properly store CSRF token
  csrfToken?: string
}

class App extends React.Component<{}, AppState> {

  public constructor(props: any) {
    super(props)

    this.state = {}

    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  public render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/new/login' element={<this.LoginPage />} />
        <Route path='/new/login-oidc' element={<LoginOidcPage />} />
        <Route path='/new/' element={<this.HomePage />} />
        <Route path='/new/datasets' element={<this.DatasetsPage />} />
      </Routes>
    </BrowserRouter>
    )
  }

  // Login page
  private LoginPage = () => {
    return <div>
      <form onSubmit={this.handleSubmit}>
      <div>
        <label htmlFor="username-input">Username:</label>
        <input
          id="username-input"
          type="text"
          onChange={this.handleChangeUsername}
          value={this.state.username || ""}
        />
      </div>
      <div>
        <label htmlFor="password-input">Password:</label>
        <input
          id="password-input"
          type="password"
          onChange={this.handleChangePassword}
          value={this.state.password || ""}
        />
      </div>
      <button id="login-button" type="submit">
        Submit
      </button>
    </form>
    </div>
  }

  // Home page
  private HomePage = () => {
    return <div style={{padding: 30}}>
      <h1>React Application POC</h1>
      <p><Link to="/new/login" reloadDocument={true}>Go to login section</Link></p>
      <p><Link to="/new/login-oidc">Go to login OIDC section</Link></p>
      <p><Link to="/dataverseuser.xhtml" reloadDocument={true}>Go to dataverse user page</Link></p>
      <p><Link to="/new/datasets">Go to datasets section</Link></p>
    </div>
  }

  // Sample Page
  private DatasetsPage = () => {
    return <div style={{padding: 30}}>
      <h1>Datasets section</h1>
      <div className={'dataverse-container'}>
        <Button onClick={() => this.getDatasetInfo()}>Get Dataset information</Button>
        <div className={'dataverse-response'}>{JSON.stringify(this.state.data)}</div>
      </div>
    </div>
  }

  private async getDatasetInfo() {
    const response = await DatasetService.getDatasetInfo("6", this.state.csrfToken || "")
    this.setState({
      data: response.data
    })
  }

  private handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: event.target.value.toString()
    })
  }

  private handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value.toString()
    })
  }

  private async handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await LoginService.login(this.state.username || "", this.state.password || "")
    if(response.status == 200) {
      this.setState({
        csrfToken: response.headers["x-csrf-token"]
      })
    }
  }
}

export const LoginOidcPage = () => {
  const { authService } = useAuth();

  const login = async () => {
    authService.authorize()
  }
  
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default App
