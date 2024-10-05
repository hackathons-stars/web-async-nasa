import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import routes from "./routes/routes";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  return (
    <APIProvider apiKey={"AIzaSyDRvcXg0ENBOpG97u6miPvH3_2Bdl66sCk"}>
      <Router>
        <Routes>
          <Route path={routes.HOME} element={<Home />} />
        </Routes>
      </Router>
    </APIProvider>
  );
}

export default App;
