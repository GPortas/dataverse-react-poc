import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/new/' element={<HomePage />} />
        <Route path='/new/datasets' element={<DatasetsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Home page
const HomePage = () => {
  return <div style={{padding: 30}}>
    <h1>Hello world. This is a React Application test</h1>
    <p><Link to="/dataverseuser.xhtml" reloadDocument={true}>Go to dataverse user page</Link></p>
    <p><Link to="/new/datasets">Go to datasets section</Link></p>
  </div>
}

// Sample Page
const DatasetsPage = () => {
  return <div style={{padding: 30}}>
    <h1>Datasets section</h1>
  </div>
}

export default App;
