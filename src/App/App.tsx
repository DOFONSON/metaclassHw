import { useQueryParamStoreInit } from '../store/RootStore/hooks/useQueryParamStoreInit';
import './App.css'
import ReposPage from './pages/ReposPage'
import SingleRepoPage from './pages/SingleRepoPage'
import UserPage from './pages/UserPage';
import { Routes, Route } from 'react-router-dom';
import { RootStoreProvider } from '../store/RootStore/RootStore/RootStoreProvider';
import { useLocalObservable } from 'mobx-react-lite';
import { ClientProfileStore } from '../store/ClientProfileStore/ClientProfileStore';
import Header from '../components/Header';
import React from 'react';
const App = () => {
  useQueryParamStoreInit()
  const cliStore = useLocalObservable(() => new ClientProfileStore());

  return (
    <>
      <Header cliStore={cliStore} />
      <RootStoreProvider>
        <Routes>
          <Route path='/' element={<ReposPage />}></Route>
          <Route path='/repo'>
            <Route path=':id' element={<SingleRepoPage />}></Route>
          </Route>
          <Route path='/user' element={<UserPage />}></Route>
        </Routes>
      </RootStoreProvider>
    </>

  )
}

if (module.hot) {
  module.hot.accept()
}

export default App