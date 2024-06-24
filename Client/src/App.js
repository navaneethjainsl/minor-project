// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import Contact from "./components/Contact";
// import Announcement from "./components/Announcement";
// import Videos from "./components/Videos";
// import Home from "./components/Home";
// import Qna from "./components/Qna";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <main>
//           <Sidebar />
//           <div className="main-content">
//             <Navbar />
//             <Switch>
//               <Route exact path="/" component={Home} />
//               <Route path="/videos" component={Videos} />
//               <Route path="/announcement" component={Announcement} />
//               <Route path="/qna" component={Qna} />
//               <Route path="/contact" component={Contact} />
//             </Switch>
//           </div>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
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
              </Switch>
            </div>
          </main>
        </div>
      </Switch>
    </Router>
  );
}

export default App;

