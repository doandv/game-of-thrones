import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomeComp from "./pages/homePage";
import LoginComp from './pages/loginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComp />}></Route>
        <Route path="/home" element={<HomeComp />}></Route>
        <Route path="/login" element={<LoginComp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
