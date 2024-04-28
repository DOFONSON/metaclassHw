import { useQueryParamStoreInit } from '../store/RootStore/hooks/useQueryParamStoreInit';
import './App.css'
import RepoPage from './pages/RepoPage'
import UserPage from './pages/UserPage'
import { Routes, Route } from 'react-router-dom';
const App = () => {
  useQueryParamStoreInit()
  return (
    <Routes>
      <Route path='/' element={<RepoPage />}></Route>
      <Route path='/repo'>
        <Route path=':id' element={<UserPage></UserPage>}></Route>
      </Route>
    </Routes>
  )
}

export default App