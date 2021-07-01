import "./App.css";
import LoginForm from "./components/loginForm/LoginForm";
import RegisterForm from "./components/registerForm/RegisterForm";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import AddProductForm from "./components/addProductForm/AddProductForm";
import EditProductForm from "./components/editProducForm/EditProductForm";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/sign-up"} component={RegisterForm} />
          <ProtectedRoute path={"/add-product"} component={AddProductForm} />
          <ProtectedRoute
            path={"/:id/edit-product"}
            component={EditProductForm}
          />
          <ProtectedRoute path={"/"} component={Home} exact={true} />
          <Route path='**' render={() => <Redirect to='/' />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
