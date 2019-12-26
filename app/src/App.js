import React from 'react';
import './App.css';
import Mytable from './Pages'
import MyInfo from './Components/Myinfo'
import { Route, Switch,} from 'react-router-dom';


function App() {
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={Mytable} />
          <Route exact path="/myinfo" component={MyInfo} />
        </Switch>
      </div>
    );
}



export default App;