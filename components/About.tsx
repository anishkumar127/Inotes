import React from "react";
import { AboutCard } from "./AboutCard";

export const About = () => {
  return (
    <div>
      <div className="p-2 text-center bg-secondary text-white">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>
          Resize the browser window to see that this page is responsive by the
          way.
        </p>
      </div>
      <h2 className="text-center">Our Team</h2>
      <div className="d-flex gap-3">
        <AboutCard />
        <AboutCard />
        <AboutCard />
      </div>
    </div>
  );
};
