import { createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import ProductDetail from "./routes/ProductDetail";
import ProductList from "./routes/ProductList";
import Register from "./routes/Register";
import Upload from "./routes/Upload";

export const LoggedIn = createContext();

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/productDetail/:id" component={ProductDetail} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
