import {BrowserRouter as Router , Route , Routes } from "react-router-dom";
import './App.css';
import AuthPage from "./pages/Login"; 
import HomePage from "./pages/HomePage";
 import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </Router>
  );
}

export default App;