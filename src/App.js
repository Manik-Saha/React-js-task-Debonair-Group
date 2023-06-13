import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
