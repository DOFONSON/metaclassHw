import './App.css'
import RepoPage from './pages/RepoPage'
import UserPage from './pages/UserPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RepoPage></RepoPage>}></Route>
        <Route path='/repo'>
          <Route path=':id' element={<UserPage></UserPage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App