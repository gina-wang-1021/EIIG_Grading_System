import { useState } from "react";
import "../styles/AdminSetScores.css";
import Header from "../components/Header";
import BackButton from "../components/admin/BackButton";

function AdminSetScores() {
  return (
    <div id="settingRoot">
      <Header />
      <BackButton />
    </div>
  );
}

export default AdminSetScores;
