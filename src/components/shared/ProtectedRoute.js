import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const userStrFormat = localStorage.getItem("user");
  const [user, setUser] = useState(getObjfromLocalStorage("user"));
  console.log(user);
  useEffect(() => {
    setUser(getObjfromLocalStorage("user"));
  }, [userStrFormat]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return !user ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} user={user} />
        );
      }}
    />
  );
}
export default ProtectedRoute;

function getObjfromLocalStorage(name) {
  const isItem = localStorage.getItem(name);
  console.log(isItem);
  if (isItem) {
    return JSON.parse(isItem);
  }
  return null;
}
