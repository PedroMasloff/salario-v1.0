import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"


import Calculadora from './pages/calculadora';
import Tmp from './pages/tmp';

function App() {
  return (

    <BrowserRouter>
      <Switch>

        <Route exact path='/2' component={Calculadora} />
        <Route exact path='/' component={Tmp} />

      </Switch>
    </BrowserRouter>

  );
}

export default App;
