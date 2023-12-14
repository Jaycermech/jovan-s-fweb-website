import React from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Bootstrap Card with Image Placeholder */}
          <div className="card">
            <img
              src={process.env.PUBLIC_URL + "/IIT-Banner.jpg"}
              className="card-img-left" // Add img-fluid for responsive images
              alt="Placeholder Image"
              style={{ width: "210%" }} // Set the width using inline styling
            />
          </div>
        </div>
      </div>

      {/* Apply styles to make "Upcoming Events" bigger and centered */}
      <div
        className="upcoming-events"
        style={{
          textAlign: "center",
          fontSize: "54px",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Upcoming Events
      </div>
    </div>
  );
}
