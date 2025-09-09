import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow  flex justify-center">{/* 统一内容区域：顶部留出 Header 空间，并水平居中 */}
        {children}
      </main>
    </div>
  );
};

export default Layout;