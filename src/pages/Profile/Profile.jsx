import React from "react";
import { Link } from "react-router-dom";

const Profil = () => {
  return (
    <>
      profil
      <Link
        to={{
          pathname: `/login`,
          state:"dasdasdas",
        }}
      >
        Login
      </Link>
    </>
  );
};

export default Profil;
