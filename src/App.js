import React from "react";
import { Route, Routes } from "react-router-dom";
import RecordList from "./components/membersList";
import Create from "./components/create";
import Edit from "./components/edit";
import Navbar from "./components/navbar";
import MembersList from "./components/membersList";
import Home from "./components/home";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/members" element={<MembersList />} />
      </Routes>
    </div>
  );
};

export default App;
 