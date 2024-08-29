import React from "react";
import RegistrationIMG from "../../assets/Registration.png";
import "./Registration.css";

const Registration = () => {
  const HandleSubmit = (event) => {
    event.preventDefault();
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
                />
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
                />
              </div>
              <div className="pt-[38px] pb-[55px]">
                <label
                  className="font-Nunito text-sm block opacity-30 font-semibold "
                  htmlFor="text"
                >
                  Password
                </label>
                <input
                  type="text"
                  placeholder="123456789@#$skhjgHJG"
                  id="Password"
                  autoComplete="off"
                  className="py-[26px] w-3/4 rounded-lg px-6 border-4 border-[rgba(17,23,93,0.45)] "
                />
              </div>
              <button className=" py-4 w-3/4 rounded-full bg-ThemeColor text-white font-semibold mt-6 font-xl">
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
