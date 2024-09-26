import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Loading from "../CommonCompo/Loading.jsx";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, push, ref, set } from "firebase/database";

const Loginleft = () => {
  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

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
      signInWithEmailAndPassword(auth, inputvalue.Email, inputvalue.Password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential._tokenResponse.idToken;
          localStorage.setItem(
            "User Token",
            userCredential._tokenResponse.idToken,
          );
          navigate("/home");
        })
        .catch((error) => {
          const errorMessage = error;
        })
        .finally(() => {
          setLoadd(false);
        });
    }
  };

  // google login
  const HandleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("User Token", token);

        if (user) {
          let dbRef = ref(db, "users/");
          const { displayName, localId, photoUrl, email } = user.reloadUserInfo;
          set(push(dbRef), {
            displayName: displayName,
            email,
            uid: localId,
            profile_picture: photoUrl,
          });
        }
      })
      .then(() => {
        console.log("data uploded in firebase");
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Google Sign-In Error:", errorCode, errorMessage, email);
        alert(`Sign-in failed: ${errorMessage}`);
      });
  };

  return (
    <div className="flex w-[55%] items-center justify-center">
      <div>
        <div>
          <h1 className="pb-[30px] font-OpenSans text-[34px] font-bold text-[#03014C]">
            Login to your account!
          </h1>
        </div>
        <div
          className="flex max-w-[235px] cursor-pointer items-center rounded-lg border-[1px] border-[rgba(3,1,76,0.31)] py-[18px] pl-[24px] pr-10"
          onClick={HandleLoginGoogle}
        >
          <FcGoogle className="text-md" />
          <h4 className="pl-2.5 font-OpenSans font-semibold">
            Login with Google
          </h4>
        </div>
        <div>
          <form onSubmit={HandleSubmit}>
            <div>
              <label
                className="block pt-[32px] font-Nunito text-sm font-semibold opacity-30"
                htmlFor="text"
              >
                Email Adress
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="Email"
                autoComplete="off"
                className="w-3/4 rounded-lg border-2 border-[rgba(17,23,93,0.45)] py-[15px]"
                onChange={HandleInputFiel}
              />
              {Error.Emailerror && (
                <span className="ml-1 mt-2 block text-red-600">
                  {Error.Emailerror}
                </span>
              )}
            </div>
            <div className="relative pb-[55px] pt-[38px]">
              <label
                className="block font-Nunito text-sm font-semibold opacity-30"
                htmlFor="text"
              >
                Password
              </label>
              <input
                type={Eye ? "text" : "password"}
                placeholder="123456789@#$skhjgHJG"
                id="Password"
                autoComplete="off"
                className="relative w-3/4 rounded-lg border-2 border-[rgba(17,23,93,0.45)] py-[15px]"
                onChange={HandleInputFiel}
              />
              {Error.PasswordError && (
                <span className="ml-1 mt-2 block text-red-600">
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
              className="font-xl relative mt-2 w-3/4 rounded-lg bg-ThemeColor py-4 font-semibold text-white"
              onClick={Handlelogin}
            >
              {Loadd && (
                <span className="absolute left-[13%] top-[24%]">
                  <Loading />
                </span>
              )}
              Login to Continue
            </button>

            <div className="mt-[35px] w-3/4 text-center font-OpenSans font-[13px]">
              <p className="">
                Don’t have an account ?
                <span className="pl-1 font-bold text-[#EA6C00]">
                  <Link to={"/"}>Sign Up</Link>
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
