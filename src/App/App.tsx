import { useQueryParamStoreInit } from '../store/RootStore/hooks/useQueryParamStoreInit';
import './App.css'
import ReposPage from './pages/ReposPage'
import SingleRepoPage from './pages/SingleRepoPage'
import UserPage from './pages/UserPage';
import { Routes, Route } from 'react-router-dom';
import { RootStoreProvider } from '../store/RootStore/RootStore/RootStoreProvider';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { ClientProfileStore } from '../store/ClientProfileStore/ClientProfileStore';
import Header from '../components/Header';
import React, { useEffect } from 'react';
import { useRootStore } from '../store/RootStore/RootStore/RootStoreContext';

const App = observer(() => {
  useQueryParamStoreInit()
  const cliStore = useLocalObservable(() => new ClientProfileStore());
  const rootStore = useRootStore()
  let company = rootStore.query.getParam('search')
  useEffect(() => {
    console.log(rootStore.query.getParam('search'));
  }, [company]);

  console.log(rootStore.URL);

  return (
    <>
      <Header cliStore={cliStore} />
      <RootStoreProvider>
        <Routes>
          <Route path='/' element={<ReposPage />}></Route>
          <Route path={`/repo`}>
            <Route path=':id' element={<SingleRepoPage />}></Route>
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