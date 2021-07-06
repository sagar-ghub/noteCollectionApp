
import './App.css';
import {
  BrowserRouter as Router,
  Switch,withRouter,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home'
import Upload from "./Components/Upload";
import View from './Components/View';
import 'bootstrap/dist/css/bootstrap.min.css'
import Pdfr from './Components/Pdfr';

function App() {
  

  return (

    <div className="App">
      
      <Router>
       
      <Navbar/>
      <Switch>
      <Route exact path='/' component={withRouter(Home)} />
      <Route exact path='/view' component={View} />
      <Route  exact path='/upload' component={Upload} />
      <Route path='/view/:id' component={Pdfr}>
        <Pdfr />
        </Route>
    </Switch>
      </Router>
    </div>
  );
}

export default App;
