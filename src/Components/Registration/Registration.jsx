import React, { useState } from "react";
import RegistrationIMG from "../../assets/Registration.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const HandleSubmit = (event) => {
    event.preventDefault();
  };
  const [Email, setEmail] = useState("");
  const [FullName, setFullName] = useState("");
  const [Password, setPassword] = useState("");
  const [Eye, setEye] = useState(false);

  // Error consept=================
  const [EmailErr, setEmailErr] = useState("");
  const [NameErr, setNameErr] = useState("");
  const [PAssErr, setPAssErr] = useState("");
  // Error consept==================
  // Regex =========================

  const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Regex =========================
  // handleEmail factionality
  const HandleEmail = (event) => {
    setEmail(event.target.value);
  };
  // handleName factionality
  const HandleName = (event) => {
    setFullName(event.target.value);
  };
  // handlePass factionality
  const HandlePass = (event) => {
    setPassword(event.target.value);
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
      setPAssErr("");
      alert("Okay");
    }
  };

  return (
    <>
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
                  autoComplete="off"
                  className="py-[26px] w-3/4 rounded-lg px-6 border-4 border-[rgba(17,23,93,0.45)]  "
                  onChange={HandleName}
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
                className=" py-4 w-3/4 rounded-full bg-ThemeColor text-white font-semibold mt-6 font-xl"
                onClick={HandleSignUp}
              >
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
