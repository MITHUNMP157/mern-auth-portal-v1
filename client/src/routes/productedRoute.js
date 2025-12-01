import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../api/Auth";

const ProductedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyToken();
      setIsValid(result.valid);
    };
    checkAuth();
  }, []);
  if (isValid === null) {
    return <p>Checking authentication.....</p>;
  }

  return isValid ? children : <Navigate to="/" replace />;
};

export default ProductedRoute;
