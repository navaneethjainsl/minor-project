import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Portfolio} />
              <Route path="/resume" component={Resume} />
              <Route path="/portfolio" component={About} />
              <Route path="/blog" component={Blog} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;

