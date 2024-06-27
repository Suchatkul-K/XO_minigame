import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import validateLogin from "../validations/validate-login";
import { useAuth } from "../context/UserContext";

const initial = {
  email: "",
  password: "",
};

function LoginModal() {
  const [input, setInput] = useState(initial);
  const [error, setError] = useState();

  const { login, setLoading } = useAuth();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const errObj = validateLogin(input);
      if (errObj) {
        return setError(errObj);
      }
      await login(input);
      setInput(initial);
      

      toast.success("Log in successfully");
      document.getElementById("loginModal").close();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    } finally {
        setLoading(false)
    }
  };

  return (
    <dialog id="loginModal" className="modal">
      <div className="modal-box p-1">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">
            ✕
          </button>
        </form>

        {/* Form section */}
        <div className="card bg-base-100 w-full shrink-0">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                value={input.email}
                name="email"
                onChange={handleChange}
              />
              {error?.email && (
                <span className="flex text-error">{error.email}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={input.password}
                name="password"
                onChange={handleChange}
              />
              {error?.password && (
                <span className="flex text-error">{error.password}</span>
              )}
            </div>

            <div className="form-control mt-6 gap-4">
              <button className="btn btn-secondary text-xl font-semibold">
                Login
              </button>
              <hr />
              <div
                className="btn btn-primary text-xl font-semibold "
                onClick={() =>
                  document.getElementById("registerModal").showModal()
                }
                type="button"
              >
                Create new account
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Allow toasts to show up */}
      {/* <ToastContainer
        position="bottom-left" 
        autoClose={5000}
        draggablee
        transition:Bounce
      /> */}
    </dialog>
  );
}

export default LoginModal;
