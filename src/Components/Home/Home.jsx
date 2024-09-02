import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VerifyEmail from "../HomeComponents/VerifyEmail";

const Home = () => {
  const auth = getAuth();

  const [userinfo, setuserinfo] = useState({
    emailVerified: false,
    displayName: "",
    email: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user.emailVerified);
      setuserinfo({
        ...userinfo,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        email: user.email,
      });
    });
  }, []);

  return <div>{userinfo.emailVerified ? <HomeMain /> : <VerifyEmail />}</div>;
};

export default Home;
