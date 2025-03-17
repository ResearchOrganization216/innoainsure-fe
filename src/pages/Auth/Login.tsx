import useAuthStore from "@/stores/authStore";
import axiosInstance from "@/utils/apiUtil";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { clsx } from "clsx";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLoading] = useState(false);

  // Zustand store action
  const storeUser = useAuthStore((state) => state.storeUser);

  // Mutate function: calls your Flask backend /auth/login
  const {
    mutate: signIn,
    isPending,
    error,
    reset,
    isError,
  } = useMutation({
    mutationFn: () => {
      // Must match the BE's expected JSON keys: { email, password }
      return axiosInstance.post("/auth/login", {
        email,
        password,
      });
    },
    onSuccess: (res) => {
      // If your backend returns { "message": "Login successful", "token": <token> }
      // then store that token in Zustand/localStorage:
      storeUser(res.data.token);

      // Navigate to /dashboard after successful login
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Login Error: ", err);
    },
  });

  if (isLoading) {
    return (
      <div>
        <h3 className="text-[20px]">LOADING...</h3>
      </div>
    );
  } else {
    return (
      <div className="login-bg absolute inset-0 z-20 flex h-screen w-full flex-col md:flex-row">
        <div className="flex w-full flex-col justify-center px-5 md:w-1/2 lg:px-36 md:ml-auto">
          <div className="mb-9 space-y-8 justify-center">
            <div className="text-[40px] font-semibold text-center mr-[90px] text-primary-blue">
              Sign-in
            </div>
          </div>

          {/* Username with user icon */}
          <div className="p-input-icon-left w-full max-w-sm mb-8">
            <i className="pi pi-user text-primary-blue px-4" />
            <InputText
              placeholder="Username / Email"
              size="large"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                reset(); // clears mutation error state
              }}
              className={clsx(
                "!rounded-[20px] !py-3 !px-12 !border-[2px] !border-primary-blue",
                {
                  "p-invalid": isError,
                }
              )}
            />
          </div>

          {/* Password with lock icon */}
          <div className="p-input-icon-left w-full max-w-sm">
            <i className="pi pi-lock text-primary-blue px-4" />
            <InputText
              type="password"
              placeholder="Password"
              size="large"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                reset(); // clears mutation error state
              }}
              className={clsx(
                "!rounded-[20px] !py-3 !px-12 !border-[2px] !border-primary-blue",
                {
                  "p-invalid": isError,
                }
              )}
            />
          </div>

          {error && error instanceof AxiosError && (
            <div className="py-3 text-sm text-primary-red">
              {/* If the BE returns { "error": "Invalid email or password" } or something else */}
              {error.response?.data.error || error.response?.data.message}
            </div>
          )}

          <div className="text-primary-link my-10 cursor-pointer mr-[100px] text-right text-sm !text-primary-blue">
            Forgot Password ?
          </div>

          <Button
            size="large"
            onClick={() => signIn()}
            loading={isPending}
            disabled={password.length === 0 || email.length === 0}
            className="w-[390px] text-[16px] shadow-[0px_2px_8px_0px_rgba(0,110,184,0.8)] 
                       !rounded-[20px] !font-bold !bg-primary-blue !text-white"
            type="button"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
