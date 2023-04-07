import React from "react";

export const AboutCard = () => {
  return (
    <div>
      <div className="row">
        <div className="column">
          <div className="card">
            <img
              src="https://www.w3schools.com/w3images/team1.jpg"
              alt="Jane"
            />
            <div className="container">
              <h2>Jane Doe</h2>
              <p className="text-secondary">CEO & Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>jane@example.com</p>
              <p>
                <button className="btn btn-dark">Contact</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
