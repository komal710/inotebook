import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alerts from './components/Alerts';

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Alerts message="This is amazing"></Alerts>
    <Navbar/>
    <div className="container">
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path="/about" element={<About  />} />
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
