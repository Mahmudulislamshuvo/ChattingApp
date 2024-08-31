import React, { useState } from "react";
import RegistrationIMG from "../../assets/Registration.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Registration = () => {
  const auth = getAuth();
  const HandleSubmit = (event) => {
    event.preventDefault();
  };
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [Password, setPassword] = useState("");
  const [Eye, setEye] = useState(false);
  const [loading, setloading] = useState(false);

  // Error consept=================
  const [EmailErr, setEmailErr] = useState("");
  const [NameErr, setNameErr] = useState("");
  const [PAssErr, setPAssErr] = useState("");
  // Error consept==================
  // Regex =========================

  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  // Regex =========================
  // handleEmail factionality
  const HandleEmail = (event) => {
    setEmail(event.target.value);
    if (EmailErr) {
      setEmailErr("");
    }
  };
  // handleName factionality
  const HandleName = (event) => {
    setFullName(event.target.value);
    if (NameErr) {
      setNameErr("");
    }
  };
  const HandlePass = (event) => {
    setPassword(event.target.value);
    if (PAssErr) {
      setPAssErr("");
    }
  };
  // eye fucntonality
  const HandleEye = () => {
    setEye(!Eye);
  };
  // signUp functionality
  const HandleSignUp = () => {
    if (!Email) {
      setEmailErr("Email Missing");
    } else if (!EmailRegex.test(Email)) {
      setEmailErr("Email Invalid");
    } else if (!FullName) {
      setEmailErr("");
      setNameErr("Name Missing");
    } else if (!Password) {
      setEmailErr("");
      setNameErr("");
      setPAssErr("Password missing");
    } else if (!PasswordRegex.test(Password)) {
      setEmailErr("");
      setNameErr("");
      setPAssErr("Password formate invalid");
    } else {
      setloading(true);
      setPAssErr("");
      setEmail("");
      setFullName("");
      setPassword("");
      // Signup new user
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          setloading(false);
          sendEmailVerification(auth.currentUser).then(() => {
            toast.success("🦄 Please Check your Email", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          });
        })
        .catch((error) => {
          setloading(false);
          console.log(error);
          if (error.message.includes("email-already-in-use")) {
            toast.error("🦄 Email already Registared, Try another Email", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
              style: { width: "25vw" },
            });
          } else {
            console.log(error.message);
          }
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex">
        <div className="w-1/2 h-screen flex items-center justify-center">
          <div className="">
            <h2 className="font-Nunito font-bold text-[34px] text-[#11175D] pb-2.5">
              Get started with easily register
            </h2>
            <p className="font-Nunito text-sm pb-[42px]">
              Free register and you can enjoy it
            </p>
            <form onSubmit={HandleSubmit}>
              {/* <Input
                className={"pt-[38px]"}
                type="text"
                placeholder="Enter your Email"
                id="email"
                label="Email address"
              /> */}
              <div>
                <label
                  className="font-Nunito text-sm block font-semibold opacity-30"
                  htmlFor="text"
                >
                  Email Adress
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  id="Email"
                  value={Email}
                  autoComplete="off"
                  className="py-[26px] w-3/4 rounded-lg px-6 border-4 border-[rgba(17,23,93,0.45)] "
                  onChange={HandleEmail}
                />
                {EmailErr && (
                  <span className="text-red-600 block mt-2 ml-1">
                    {EmailErr}
                  </span>
                )}
              </div>
              <div className="pt-[38px]">
                <label
                  className="font-Nunito text-sm block font-semibold opacity-30"
                  htmlFor="text"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name "
                  id="fulname"
                  value={FullName}
                  autoComplete="off"
                  className="py-[26px] w-3/4 rounded-lg px-6 border-4 border-[rgba(17,23,93,0.45)]  "
                  onChange={HandleName}
                  // onChange={(event) => {
                  //   event.target.value;
                  // }} evabe dile function use korte parbona.
                />
                {NameErr && (
                  <span className="text-red-600 block mt-2 ml-1">
                    {NameErr}
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
                  value={Password}
                  autoComplete="off"
                  className="py-[26px] w-3/4 rounded-lg px-6 border-4 border-[rgba(17,23,93,0.45)] "
                  onChange={HandlePass}
                />
                {PAssErr && (
                  <span className="text-red-600 block mt-2 ml-1">
                    {PAssErr}
                  </span>
                )}
                <div
                  className="absolute right-[30%] top-[50%] translate-y-[-50%] cursor-pointer"
                  onClick={HandleEye}
                >
                  {Eye ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <button
                className=" py-4 w-3/4 rounded-full bg-ThemeColor text-white font-semibold mt-6 font-xl relative "
                onClick={HandleSignUp}
              >
                {loading && (
                  <svg
                    class=" animate-spin h-5 w-5 mr-3 ... absolute top-[35%] left-[30%] border-4 rounded-full border-t-red-200 border-b-red-600"
                    viewBox="0 0 24 24"
                  ></svg>
                )}
                Sign up
              </button>
            </form>
            <div className="text-center w-3/4 mt-[35px] font-OpenSans font-[13px]">
              <p className="">
                Already have an account ?{" "}
                <span className="text-[#EA6C00] font-bold">Sign In</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen">
          <picture>
            <img
              className="w-full h-full object-cover"
              src={RegistrationIMG}
              alt="Registration.png"
            />
          </picture>
        </div>
      </div>
    </>
  );
};

export default Registration;
