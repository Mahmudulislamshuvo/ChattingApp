import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VerifyEmail from "../HomeComponents/VerifyEmail";
import HomeMain from "./HomeMain";
import LoadingPage from "../CommonCompo/LoadingPage";

const Home = () => {
  const auth = getAuth();

  const [userinfo, setuserinfo] = useState({
    emailVerified: null, // Set to null initially to handle loading state
    displayName: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuserinfo({
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          email: user.email,
        });
      }
      setLoading(false); // Stop loading once user info is set
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingPage />
      </div>
    ); // Render a loading message or spinner
  }

  // Main body start from here==========================
  return <div>{userinfo.emailVerified ? <HomeMain /> : <VerifyEmail />}</div>;
};

export default Home;

// ======================PRACTICE NEED AGAIN, I AM NOT SATICEFIED WITH MY PRACTICE====================

// import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import VerifyEmail from "../HomeComponents/VerifyEmail";
// import HomeMain from "./HomeMain";

// const Home = () => {
//   const auth = getAuth();

//   const [userinfo, setuserinfo] = useState({
//     emailVerified: null,
//     displayName: "",
//     email: "",
//   });

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setuserinfo({
//           emailVerified: user.emailVerified,
//           displayName: user.displayName,
//           email: user.email,
//         });
//       } else {
//         setuserinfo({
//           emailVerified: null,
//           displayName: "",
//           email: "",
//         });
//       }
//     });

//     // Cleanup the subscription when the component unmounts
//     return () => unsubscribe();
//   }, [auth]);

//   return <div>{userinfo.emailVerified ? <HomeMain /> : <VerifyEmail />}</div>;
// };

// export default Home;
