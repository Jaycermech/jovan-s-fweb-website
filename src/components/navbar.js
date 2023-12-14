import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../styles/styles";

export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img
            src={process.env.PUBLIC_URL + "/iit_club_logo.png"}
            alt="Navbar Image"
            style={styles.navLogo}
          />
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only"></span>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/create">
                Join Us
              </a>
            </li>
          </ul>

          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="/members" style={styles.navLinkMemberslist}>
                Members List
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" style={styles.navLinkLogin}>
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
