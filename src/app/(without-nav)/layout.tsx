import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" md:grid md:grid-cols-3 w-screen h-screen justify-items-start items-center">
      <div className="hidden md:block">add something here</div>
      <div className=" col-start-2 col-end-4 border w-full h-full">
        {children}
      </div>
    </div>
  );
}
