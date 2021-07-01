import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validations/schema";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { authHandler } from "../../utils/firebase";
import "./RegisterForm.css";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

function RegisterForm() {
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
    authHandler
      .register(email, password)
      .then((doc) => {
        history.push("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className='container align-left'>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className='col-md-4 mt-4'>
          <h2 className='text-primary py-4'>Sign up</h2>
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
                Register
              </button>
              <p className='mt-2'>
                Already have an account ? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </form>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}

export default RegisterForm;
