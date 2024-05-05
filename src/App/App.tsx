import { useQueryParamStoreInit } from '../store/RootStore/hooks/useQueryParamStoreInit';
import './App.css'
import ReposPage from './pages/ReposPage'
import SingleRepoPage from './pages/SingleRepoPage'
import UserPage from './pages/UserPage';
import { Routes, Route } from 'react-router-dom';
import { RootStoreProvider } from '../store/RootStore/RootStore/RootStoreProvider';
const App = () => {
  useQueryParamStoreInit()
  return (
    <RootStoreProvider>
      <Routes>
        <Route path='/' element={<ReposPage />}></Route>
        <Route path='/repo'>
          <Route path=':id' element={<SingleRepoPage />}></Route>
        </Route>
        <Route path='/user' element={<UserPage />}></Route>
      </Routes>
    </RootStoreProvider>
  )
}

export default App