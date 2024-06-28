import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Announcement from "./components/Announcement";
import Videos from "./components/Videos";
import Home from "./components/Home";
import Qna from "./components/Qna";
import "./App.css";
import Register from './components/Register';
import Login from './components/Login';
import File from "./components/Fileshare";
import PdfSummaryPage from "./components/PdfSummaryPage"; // Adjust import path
import ExtractTextPage from "./components/ExtractTextPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Register className="register-form" /> {/* Unique class name */}
        </Route>
        <Route path="/login">
          <Login className="login-form" /> {/* Unique class name */}
        </Route>
        <div className="App">
          <main>
            <Sidebar />
            <div className="main-content">
              <Navbar />
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/videos" component={Videos} />
                <Route path="/announcement" component={Announcement} />
                <Route path="/qna" component={Qna} />
                <Route path="/contact" component={Contact} />
                <Route path="/fileshare" component={File} />
                <Route path="/pdf-summary" component={PdfSummaryPage} />
                <Route path="/extract-text" component={ExtractTextPage} />

              </Switch>
            </div>
          </main>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
