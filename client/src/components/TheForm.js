import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function TheForm({ values, errors, touched, status }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // status sometimes comes through as undefined
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <>
      <Form>
        <label>
          Username
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
          <Field type="text" name="username" placeholder="Username ..." />
        </label>
        <label>
          Password
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
          <Field type="password" name="password" placeholder="Password" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      <h1>Current Users</h1>
      {users
        ? users.map(user => (
            <p key={user.id} className="users">
              Name : {user.name} Role : {user.role}
            </p>
          ))
        : null}
    </>
  );
}

const FormikForm = withFormik({
  //Here  remember to handle the inputs using the args you give to you mapPropsToValues

  enableReinitialize: true,
  mapPropsToValues: ({ username, password }) => {
    return {
      username: "",
      password: "",
      users: ["Example User"]
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(6, "Username must be at least 6 characters")
      .required("Please Provide A Valid Username"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters")
      .required("Please Provide Your Password")
  }),
  handleSubmit(values, { resetForm, setStatus }) {
    axios
      .post("http://localhost:5000/api/register", {
        username: values.username,
        password: values.password
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    resetForm();
    axios
      .get("http://localhost:5000/api/restricted/data")
      .then(response => {
        setStatus(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
})(TheForm);

export default FormikForm;
