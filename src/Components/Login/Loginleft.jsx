import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loading from "../CommonCompo/Loading.jsx";
import { Link } from "react-router-dom";

const Loginleft = () => {
  const auth = getAuth();
  const HandleSubmit = (event) => {
    event.preventDefault();
  };

  const [Eye, setEye] = useState(false);
  const [Loadd, setLoadd] = useState(false);

  //   const HandleEye = () => {
  //     setEye(!Eye);
  //   }; note: etar poriborte niche same vhabe function er moddhe disi

  //   Regex pass
  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [inputvalue, setinputvalue] = useState({
    Email: "",
    Password: "",
  });

  const [Error, setError] = useState({
    Emailerror: "",
    PasswordError: "",
  });

  // input functionality dynamic===============================================
  const HandleInputFiel = (event) => {
    const { id, value } = event.target;

    setinputvalue({
      ...inputvalue,
      [id]: value,
    });

    // Reset the corresponding error when the user starts typing
    if (id === "Email" && Error.Emailerror) {
      setError({
        ...Error,
        Emailerror: "",
      });
    } else if (id === "Password" && Error.PasswordError) {
      setError({
        ...Error,
        PasswordError: "",
      });
    }
  };

  const Handlelogin = () => {
    if (!inputvalue.Email) {
      setError({
        ...Error,
        Emailerror: "Email missing",
      });
    } else if (!EmailRegex.test(inputvalue.Email)) {
      setError({
        ...Error,
        Emailerror: "Email Invalid",
      });
    } else if (!inputvalue.Password) {
      setError({
        ...Error,
        PasswordError: "Password Missing",
      });
    } else {
      setLoadd(true);
      alert("All Okay");
      signInWithEmailAndPassword(auth, inputvalue.Email, inputvalue.Password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorMessage = error;
        })
        .finally(() => {
          setLoadd(false);
        });
    }
  };

  return (
    <div className="flex w-[55%] justify-center items-center">
      <div>
        <div>
          <h1 className="text-[#03014C] font-bold text-[34px] font-OpenSans pb-[30px]">
            Login to your account!
          </h1>
        </div>
        <div className="max-w-[230px] rounded-lg border-[1px] border-[rgba(3,1,76,0.31)] flex py-[18px] pr-10 pl-[24px] items-center">
          <FcGoogle className="text-md" />
          <h4 className="pl-2.5 font-OpenSans font-semibold">
            Login with Google
          </h4>
        </div>
        <div>
          <form onSubmit={HandleSubmit}>
            <div>
              <label
                className="font-Nunito text-sm block font-semibold opacity-30 pt-[32px]"
                htmlFor="text"
              >
                Email Adress
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="Email"
                autoComplete="off"
                className="pt-[15px] w-3/4 border-b-2 border-[rgba(17,23,93,0.45)]"
                onChange={HandleInputFiel}
              />
              {Error.Emailerror && (
                <span className="text-red-600 block mt-2 ml-1">
                  {Error.Emailerror}
                </span>
              )}
            </div>
            <div className="pt-[38px] pb-[55px] relative">
              <label
                className="font-Nunito text-sm block opacity-30 font-semibold "
                htmlFor="text"
              >
                Password
              </label>
              <input
                type={Eye ? "text" : "password"}
                placeholder="123456789@#$skhjgHJG"
                id="Password"
                autoComplete="off"
                className="pt-[15px] w-3/4 border-b-2 border-[rgba(17,23,93,0.45)] relative"
                onChange={HandleInputFiel}
              />
              {Error.PasswordError && (
                <span className="text-red-600 block mt-2 ml-1">
                  {Error.PasswordError}
                </span>
              )}
              <div
                //   uporer eye er function komano hoyse eta diye
                className="absolute right-[30%] top-[50%] translate-y-[-50%] cursor-pointer"
                onClick={() => {
                  setEye(!Eye);
                }}
              >
                {Eye ? <FaEyeSlash /> : <FaEye />}
              </div>

              <div className="absolute right-[30%] top-[50%] translate-y-[-50%] cursor-pointer"></div>
            </div>

            <button
              className=" py-4 w-3/4 rounded-lg bg-ThemeColor text-white font-semibold mt-2 font-xl relative"
              onClick={Handlelogin}
            >
              {Loadd && (
                <span className="absolute top-[24%] left-[13%]">
                  <Loading />
                </span>
              )}
              Login to Continue
            </button>

            <div className="text-center w-3/4 mt-[35px] font-OpenSans font-[13px]">
              <p className="">
                Don’t have an account ?
                <span className="text-[#EA6C00] font-bold pl-1">
                  <Link to={"/"}>Sign In</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginleft;
