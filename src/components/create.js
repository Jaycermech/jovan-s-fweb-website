import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    martriculation_number: "",
    name: "",
    role: "",
    mobile: "",
    attendance: "",
    status: "",
  });
 
  const navigate = useNavigate();

  // This function will update the state properties.
  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    console.log("Form values on submission:", form);

    if (
      !form.martriculation_number ||
      !form.name ||
      !form.role ||
      !form.mobile ||
      !form.attendance ||
      !form.status
    ) {
      window.alert("Please fill in all fields");
      return;
    }

    // When a post request is sent to the create URL, we'll add a new record to the database.
    const newPerson = { ...form };

    try {
      await fetch("http://localhost:5050/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
    } catch (error) {
      window.alert(error);
      return;
    }

    setForm({
      martriculation_number: "",
      name: "",
      role: "",
      mobile: "",
      attendance: "",
      status: "",
    });

    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <form onSubmit={onSubmit}>
        <h3>Add new members</h3>
        <div className="form-group">
          <label htmlFor="martriculation_number">Martriculation Number</label>
          <input
            type="text"
            className="form-control"
            id="martriculation_number"
            value={form.martriculation_number}
            onChange={(e) =>
              updateForm({ martriculation_number: e.target.value })
            }
            style={{ width: "500px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            style={{ width: "500px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={form.role}
            onChange={(e) => updateForm({ role: e.target.value })}
            style={{ width: "500px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            className="form-control"
            id="mobile"
            value={form.mobile}
            onChange={(e) => updateForm({ mobile: e.target.value })}
            style={{ width: "500px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="attendance">Attendance</label>
          <input
            type="number"
            className="form-control"
            id="attendance"
            value={form.attendance}
            onChange={(e) => {
              // Ensure the entered value is within the range 0 to 100
              const newValue = Math.min(
                Math.max(parseInt(e.target.value) || 0, 0),
                100
              );
              updateForm({ attendance: newValue });
            }}
            style={{ width: "500px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            value={form.status}
            onChange={(e) => updateForm({ status: e.target.value })}
            style={{ width: "500px" }}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div
          className="form-group"
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="submit"
            value="Create member"
            className="btn btn-success"
          />
        </div>
      </form>
    </div>
  );
}
