import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Video from './components/Video';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import Images from './components/Images';
import Pdfcollection from './components/Pdfcollection'; 
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <>
      {/* <ImageUpload/> */}
      <AuthState>
    <NoteState>
    <Router>
    <Navbar/>
      <Switch>
        <Route path="/about">
          <About/> 
        </Route>
        <Route path="/video">
          <Video/> 
        </Route>
        <Route path="/images">
          <Images/> 
        </Route>
        <Route path="/pdf">
          <Pdfcollection/>
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
    </AuthState>
    </>

  );
}

export default App;
