import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";

const ListUserComponent = (props) => {
  const [users, setUsers] = useState([]);
  // odpowiednik componentDidMount
  useEffect(() => {
    UserService.getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const addUser = () => {
    props.history.push("/add-user");
  };

  const editUser = (id) => {
    props.history.push(`/update-user/${id}`);
  };

  const deleteUser = (id) => {
    UserService.deleteUser(id).then((res) => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const login = () => {
    props.history.push(`/login/`);
  };

  return (
    <div>
      <h2 className="text-center">Users List</h2>
      <div className="btn btn-primary" onClick={addUser}>
        Add User
      </div>
      <div
        style={{ marginLeft: "10px" }}
        className="btn btn-primary"
        onClick={login}
      >
        Login
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Phonenumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td> {user.name} </td>
                <td> {user.surname}</td>
                <td> {user.email}</td>
                <td> {user.phonenumber} </td>
                <td>
                  <button
                    onClick={() => editUser(user.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUserComponent;
