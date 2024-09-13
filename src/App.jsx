import React, { useState, useEffect } from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
// import Shift from "../screens/Shifts";
import Welcome from "../screens/Wecome";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BallTriangle } from "react-loader-spinner";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Welcome />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/shift" element={<Shift />} /> */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>

            )};
    </>
  );
};

export default App;
