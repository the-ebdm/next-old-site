import Panel from "../Molecule/panel";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import SignUp from "./SignUp";
import firebase from "../../lib/firebase";
import { useRouter } from "next/router";
import Button from "../Atom/button";
import Input from "../Atom/input";
import { LoginProvider, LoginContext } from "../Atom/loginContext";

const Login = ({}) => {
  const [register, setRegister] = useState(false);
  return (
    <LoginProvider>
      <LoginPanel />
    </LoginProvider>
  );
};

const LoginPanel = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        firebase.analytics().logEvent("login", {
          method: "Email",
        });
        router.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(error);
        console.log(error);
      });
  };
  const [state, setState] = useContext(LoginContext);
	const toggle = () => {
		setState({...state, open: !state});
	}

	return (
		<Panel open={state.open || false} setOpen={() => toggle()}>
			<section className="container h-screen mx-auto flex">
				<div className="w-full">
					<h1 className="text-6xl font-bold">Login</h1>
					<p className="mt-6">
						Don't have an account?{" "}
						<span
							className="cursor-pointer underline"
							onClick={() => setRegister(true)}
						>
							Sign Up
						</span>{" "}
					</p>
					<form onSubmit={handleLogin} className="mt-4">
						<div className="mb-4">
							<Input name="Email" type="email" setValue={(e) => setEmail(e)} />
						</div>
						<Input
							name="Password"
							type="password"
							setValue={(e) => setPassword(e)}
						/>

						<div className="mt-6">
							<Button
								type="submit"
								disabled={!email || !password}
								name="Login"
								onClick={async event => {
									await handleLogin(event)
								}}
							/>
						</div>
					</form>
				</div>
			</section>
		</Panel>
	);
};

export default Login;
