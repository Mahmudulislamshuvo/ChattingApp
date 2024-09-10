import React, { useState } from "react";
import RegistrationIMG from "../../assets/Registration.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const HandleSubmit = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

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
          console.log(userCredential);
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
              onClose: () => navigate("/login"), // Navigate on toast close
            });
            updateProfile(auth.currentUser, {
              displayName: FullName,
              photoURL: null,
            })
              .then(() => {
                onAuthStateChanged(auth, (userinfo) => {
                  let dbRef = ref(db, "users/");
                  set(push(dbRef), {
                    displayName: userinfo.displayName,
                    email: userinfo.email,
                    uid: userinfo.uid,
                    picUrl: "",
                  });
                });
              })
              .then(() => {
                console.log("data upload done");
              })
              .catch(() => {
                console.log("database Write failed");
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
        <div className="flex w-1/2 items-center justify-center">
          <div className="">
            <h2 className="pb-2.5 font-Nunito text-[34px] font-bold text-[#11175D]">
              Get started with easily register
            </h2>
            <p className="pb-[42px] font-Nunito text-sm">
              Free register and you can enjoy it
            </p>
            <form onSubmit={HandleSubmit}>
              <div>
                <label
                  className="block font-Nunito text-sm font-semibold opacity-30"
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
                  className="w-3/4 rounded-lg border-4 border-[rgba(17,23,93,0.45)] px-6 py-[26px]"
                  onChange={HandleEmail}
                />
                {EmailErr && (
                  <span className="ml-1 mt-2 block text-red-600">
                    {EmailErr}
                  </span>
                )}
              </div>
              <div className="pt-[38px]">
                <label
                  className="block font-Nunito text-sm font-semibold opacity-30"
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
                  className="w-3/4 rounded-lg border-4 border-[rgba(17,23,93,0.45)] px-6 py-[26px]"
                  onChange={HandleName}
                  // onChange={(event) => {
                  //   event.target.value;
                  // }} evabe dile function use korte parbona.
                />
                {NameErr && (
                  <span className="ml-1 mt-2 block text-red-600">
                    {NameErr}
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
                  value={Password}
                  autoComplete="off"
                  className="w-3/4 rounded-lg border-4 border-[rgba(17,23,93,0.45)] px-6 py-[26px]"
                  onChange={HandlePass}
                />
                {PAssErr && (
                  <span className="ml-1 mt-2 block text-red-600">
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
                className="font-xl relative mt-6 w-3/4 rounded-full bg-ThemeColor py-4 font-semibold text-white"
                onClick={HandleSignUp}
              >
                {loading && (
                  <svg
                    class="... absolute left-[30%] top-[35%] mr-3 h-5 w-5 animate-spin rounded-full border-4 border-b-red-600 border-t-red-200"
                    viewBox="0 0 24 24"
                  ></svg>
                )}
                Sign up
              </button>
            </form>
            <div className="mt-[35px] w-3/4 text-center font-OpenSans font-[13px]">
              <p className="">
                Already have an account ?{" "}
                <span className="font-bold text-[#EA6C00]">
                  <Link to={"login"}>Sign In</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-screen w-1/2">
          <picture>
            <img
              className="h-full w-full object-cover"
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
