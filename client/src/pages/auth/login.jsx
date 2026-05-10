import { fetchAllProducts } from "@/store/admin/products-slice";
import { loginUser } from "@/store/auth-slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formDta = {
    email,
    password,
  };
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formDta)).then((data) => {
      if (data?.payload?.success) {
        toast.error(data?.payload?.message);
      }
    });
  }
  console.log(formDta);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your Account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium  ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Sign In
          </Link>
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AuthLogin;
