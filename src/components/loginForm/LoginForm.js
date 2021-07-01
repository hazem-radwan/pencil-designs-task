import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validations/schema";
import { Link } from "react-router-dom";
import { authHandler } from "../../utils/firebase";
import { connect } from "react-redux";
import { login } from "../../redux-store/actions/firebaseActions";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

function LoginForm({ login }) {
  const [error, setError] = useState("");
  const history = useHistory();
  const user = getObjectFromLocalStorage("user");
  if (user) history.push("/");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = ({ email, password }) => {
    console.log({ email, password });
    authHandler
      .login(email, password)
      .then((doc) => {
        console.log(authHandler.auth.currentUser);
        login({
          uid: doc.user.uid,
          email: doc.user.email,
          refreshToken: doc.user.refreshToken,
        });
        history.push("/");
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  return (
    <div className='container align-left'>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className='col-md-4 mt-4'>
          <h2 className='text-primary py-4'>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <p className='text-danger'>{error}</p>}
            <div className='form-group mt-4'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                className='form-control'
                placeholder='someone@mail.com'
                {...register("email")}
              />
              {errors.email && (
                <p className='text-danger'>{errors.email.message}</p>
              )}
            </div>
            <div className='form-group mt-4'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                className='form-control'
                placeholder='please set your password'
                {...register("password")}
              />
              {errors.password && (
                <p className='text-danger'>{errors.password.message}</p>
              )}
            </div>
            <div className='form-group align-center mt-4'>
              <button type='submit' className='btn btn-primary btn-md'>
                Login
              </button>
              <p className='mt-2'>
                New user ? <Link to={"/sign-up"}>Create a new account...</Link>
              </p>
            </div>
          </form>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}
const mapDispatchToProp = (dispatch) => {
  return {
    login: (payload) => dispatch(login(payload)),
  };
};

export default connect(null, mapDispatchToProp)(LoginForm);
