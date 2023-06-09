import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { signupReducer, initialState } from "./reducer";

type Page = "Signin" | "Signup" | "History";

interface SignupPropsType {
  onSetCurrentPage: (input: Page) => void;
}

const Signup: React.FC<SignupPropsType> = ({
  onSetCurrentPage,
}: SignupPropsType) => {
  const [state, dispatch] = React.useReducer(signupReducer, initialState);
  const { name, email, password, repeatPassword, error, isLoading } = state;

  const { handleSignUp }: any = useContext(AuthContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "signup" });
    if (password !== repeatPassword) {
      dispatch({ type: "error" });
    }
    try {
      await handleSignUp(email, password, name);
      onSetCurrentPage("Signin");
      dispatch({ type: "success" });
    } catch (error: any) {}
  };

  const handleNavigateToSignup = () => {
    onSetCurrentPage("Signin");
  };

  return (
    <>
      <div className="signup_form">
        <div>
          <h1 className="title">Sign Up</h1>
          <h4 className="sub-title">
            Please fill in this form to create an account.
          </h4>
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="signup-details">
              <div>
                <input
                  value={name}
                  onChange={(e) =>
                    dispatch({
                      type: "field",
                      fieldName: "name",
                      payload: e.currentTarget.value,
                    })
                  }
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  required
                />
              </div>
            </div>
            <div className="signup-details">
              <input
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "email",
                    payload: e.currentTarget.value,
                  })
                }
                value={email}
                type="email"
                placeholder="Enter email"
                name="email"
                required
              />
            </div>
            <div className="signup-details">
              <input
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "password",
                    payload: e.currentTarget.value,
                  })
                }
                value={password}
                type="password"
                placeholder="Enter password"
                name="password"
                required
              />
            </div>
            <div className="signup-details">
              <input
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "repeatPassword",
                    payload: e.currentTarget.value,
                  })
                }
                value={repeatPassword}
                type="repeatPassword"
                placeholder="Enter repeat password"
                name="repeatPassword"
                required
              />
            </div>
            <button
              type="submit"
              className="primary-solid"
              // disabled={isLoading}
            >
              Sign Up
            </button>
          </form>
          <p className="small-text">
            Already have an account?
            <a href="#" onClick={handleNavigateToSignup}>
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
