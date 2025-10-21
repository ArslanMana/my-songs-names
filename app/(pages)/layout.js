import React from "react";
import ServerHeader from "../_components/serverHeader.js";
import Footer from "../_components/footer.js";
export default function layout({ children }) {
  return (
    <div className=" flex flex-col min-h-screen justify-between">
      <ServerHeader />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
