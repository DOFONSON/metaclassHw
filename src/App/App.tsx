import './App.css'
import RepoPage from './pages/RepoPage'
import UserPage from './pages/UserPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RepoPage></RepoPage>}></Route>
        <Route path='/user' element={<UserPage></UserPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
