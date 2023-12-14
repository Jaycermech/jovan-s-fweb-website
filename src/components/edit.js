import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    martriculation_number: "",
    name: "",
    role: "",
    mobile: "",
    attendance: "",
    status: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5050/members/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
      console.log("Record values upon retrieval:", record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

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

    const editedPerson = {
      martriculation_number: form. martriculation_number,
      name: form.name,
      role: form.role,
      mobile: form.mobile,
      attendance: form.attendance,
      status: form.status,

      
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/members/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
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
            value="Edit member"
            className="btn btn-success"
          />
        </div>
      </form>
    </div>
  );
}
