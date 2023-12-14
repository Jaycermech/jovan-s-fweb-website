import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const Members = (props) => (
  <tr>
    <td>{props.member.martriculation_number}</td>
    <td>{props.member.name}</td>
    <td>{props.member.role}</td>
    <td>{props.member.mobile}</td>
    <td>{props.member.attendance}</td>
    <td>{props.member.status}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.member._id}`}>
        Edit
      </Link>
      <button
        className="btn btn-link"
        onClick={() => props.deleteMember(props.member._id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const membersPerPage = 7;

  useEffect(() => {
    async function getMembers() {
      try {
        const response = await fetch("http://localhost:5050/members/");

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const members = await response.json();
        setMembers(members);
      } catch (error) {
        window.alert(error.message);
      }
    }

    getMembers();
  }, []);

  const deleteMember = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (shouldDelete) {
      try {
        await fetch(`http://localhost:5050/members/${id}`, {
          method: "DELETE",
        });

        const newMembers = members.filter((el) => el._id !== id);
        setMembers(newMembers);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filterMembersByStatus = () => {
    if (statusFilter === "all") {
      return members;
    } else {
      return members.filter((member) => member.status === statusFilter);
    }
  };

  const filterMembersByStatusAndSearch = () => {
    let filteredMembers = filterMembersByStatus();

    const searchTerms = ["name", "martriculation_number"];

    if (searchTerm.trim() !== "") {
      filteredMembers = filteredMembers.filter((member) =>
        searchTerms.some((property) => {
          const propertyValue = member[property];

          if (typeof propertyValue === "number") {
            return propertyValue.toString().includes(searchTerm);
          } else if (typeof propertyValue === "string") {
            return propertyValue
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }

          return false;
        })
      );
    }

    return filteredMembers;
  };

  const currentMembers = filterMembersByStatusAndSearch().slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
  );

  const pageCount = Math.ceil(
    filterMembersByStatusAndSearch().length / membersPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const memberList = () =>
    currentMembers.map((member) => (
      <Members
        member={member}
        deleteMember={() => deleteMember(member._id)}
        key={member._id}
      />
    ));

  return (
    <div className="ActiveMembersList">
      <h3>Members</h3>

      <div
        className="filter-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </form>
          </nav>
        </div>

        <div style={{ marginRight: "10px" }}>
          <label htmlFor="statusFilter">Filter by Status: </label>
          <select
            id="statusFilter"
            onChange={handleStatusChange}
            value={statusFilter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Matriculation_Number</th>
              <th>Name</th>
              <th>Role</th>
              <th>Mobile</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{memberList()}</tbody>
        </table>

        <Link to="/create">
          <button
            type="button"
            className="btn btn-success"
            style={{ marginTop: 10 }}
          >
            Add member
          </button>
        </Link>

        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default MembersList;
