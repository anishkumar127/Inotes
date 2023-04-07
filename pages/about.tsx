import { About } from "@/components/About";
import Head from "next/head";
import React from "react";

const about = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <About />
    </>
  );
};

export default about;
