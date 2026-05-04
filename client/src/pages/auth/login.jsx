import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const { toast } = useToast();

  const dispatch = useDispatch();
  // const [formData, setFormData] = useState(initialState);
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
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
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
      {/* <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
       */}

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
