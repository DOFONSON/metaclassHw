import { useQueryParamStoreInit } from '../store/RootStore/hooks/useQueryParamStoreInit';
import './App.css'
import ReposPage from './pages/ReposPage'
import SingleRepoPage from './pages/SingleRepoPage'
import UserPage from './pages/UserPage';
import { Routes, Route } from 'react-router-dom';
import { RootStoreProvider } from '../store/RootStore/RootStore/RootStoreProvider';
import { observer } from 'mobx-react-lite';
import Header from '../components/Header';
import React, { useEffect } from 'react';
import { useRootStore } from '../store/RootStore/RootStore/RootStoreContext';

const App = observer(() => {
  useQueryParamStoreInit()
  const rootStore = useRootStore()
  let company = rootStore.query.getParam('search')
  useEffect(() => {
  }, [company]);

  return (
    <>
      <RootStoreProvider>
      <Header cliStore={rootStore.cliProfileStore} />
        <Routes>
          <Route path='/' element={<ReposPage />}></Route>
          <Route path={`/repo`}>
            <Route path=':name' element={<SingleRepoPage />}></Route>
          </Route>
          <Route path='/user' element={<UserPage />}></Route>
        </Routes>
      </RootStoreProvider>
    </>

  )
})

if (module.hot) {
  module.hot.accept()
}

export default App