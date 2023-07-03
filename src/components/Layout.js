import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ height: 50 }}>
      <Outlet />
    </div>
  );
};

export default Layout;
