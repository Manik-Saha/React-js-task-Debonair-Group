import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/homepage';
import UserDetails from './pages/details/userDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/user/details/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
