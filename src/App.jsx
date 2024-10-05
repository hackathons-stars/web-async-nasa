import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import routes from "./routes/routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
