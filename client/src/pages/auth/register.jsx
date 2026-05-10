import CommonForm from "@/components/common/form";

import { registerFormControls } from "@/config";

import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "@/store/auth-slice";

import { toast } from "sonner";

const initialState = {
  userName: "",

  email: "",

  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((result) => {
      if (result.payload?.success) {
        toast.success("Registration successful!");
        navigate("/auth/login");
      } else {
        toast.error(result.payload?.message || "Registration failed");
      }
    });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground"></h1>

        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium  ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Sign up
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
