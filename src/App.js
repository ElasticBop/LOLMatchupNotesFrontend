import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import background from "./background.jpg"



function App() {
  return (
    <>
      <BrowserRouter>
        <img src = {background} className = "background"></img>
        <div className = "container">
          <Header/>
          <Routes>
            <Route path = "/" element = {<Dashboard/>}></Route>
            <Route path = "/login" element = {<Login/>}></Route>
            <Route path = "/register" element = {<Register/>}></Route>
          </Routes>
        </div>      
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
