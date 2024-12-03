import {BrowserRouter, Route , Routes } from "react-router-dom";
import './App.css';
import AuthPage from "./pages/Login"; 
import HomePage from "./pages/HomePage";
 import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;