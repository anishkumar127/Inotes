import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Notes from "@/components/Notes";
import Head from "next/head";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Notes />
    </div>
  );
}
