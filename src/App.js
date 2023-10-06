import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
      <Switch>
        <Route path="/about">
          <About/> 
        </Route>
        <Route path="/login">
          <Login/> 
        </Route>
        <Route path="/signup">
          <Signup/> 
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
    </NoteState>
    </>

  );
}

export default App;
