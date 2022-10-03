import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { DatasetService } from './services/DatasetService'
import { Button } from 'react-bootstrap'

import './App.css';

interface AppState {
  data?: any
}

class App extends React.Component<{}, AppState> {

  public constructor(props: any) {
    super(props)

    this.state = {}
  }

  public render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path='/new/' element={<this.HomePage />} />
        <Route path='/new/datasets' element={<this.DatasetsPage />} />
      </Routes>
    </BrowserRouter>
    )
  }

  // Home page
  private HomePage = () => {
    return <div style={{padding: 30}}>
      <h1>React Application POC</h1>
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
    const response = await DatasetService.getDatasetInfo("6")
    this.setState({
      data: response
    })
  }
}

export default App
