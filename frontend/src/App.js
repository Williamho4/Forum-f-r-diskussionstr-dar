import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Thread from "./pages/Thread";
import CreateThread from "./pages/CreateThread";
import EditThread from "./pages/EditThread";
import "./App.css";
import { ThreadProvider } from "./context/ThreadContext";

function App() {
  return (
    <ThreadProvider>
      <Router>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/CreateThread"}>Create New Thread</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateThread" element={<CreateThread />} />
          <Route path="/thread/:title/:id" element={<Thread />} />
          <Route path="/edit-thread/:id" element={<EditThread />} />
        </Routes>
      </Router>
    </ThreadProvider>
  );
}

export default App;
