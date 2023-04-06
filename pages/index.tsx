import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Notes from "@/components/Notes";

export default function Home() {
  return (
    <div>
      <Notes />
    </div>
  );
}
