import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, withFormik } from "formik";
import { Form as FormikForm } from "formik";
import * as Yup from "yup";
import {
  Form as StyledForm,
  Button,
  FormInput,
  FormGroup,
  Row
} from "shards-react";

const Form = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="new-user-form">
      <h1>New User Form</h1>
      <FormikForm className="form-container">
        <div className="form-row">
          <p>Name: </p>
          <Field
            className="form-item"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <div className="form-row">
          <p>Email: </p>
          <Field
            className="form-item"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <div className="form-row">
          <p>Password: </p>
          <Field
            className="form-item"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <div className="form-row">
          <p>Password Verification: </p>
          <Field
            className="form-item"
            type="password"
            name="passwordverify"
            placeholder="Password"
          />
        </div>
        {touched.passwordverify && errors.passwordverify && (
          <p className="error">{errors.passwordverify}</p>
        )}

        <label className="checkbox-container">
          I understand the terms of service
          <Field
            className="form-item"
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>

        <Button theme="primary" type="submit">
          Submit!
        </Button>
      </FormikForm>

      {users.map(user => (
        <p key={user.name}>{user.name}</p>
      ))}
    </div>
  );
};

// Higher Order Component - HOC
// Hard to share component / stateful logic (custom hooks)
// Function that takes in a component, extends some logic onto that component,
// returns a _new_ component (copy of the passed in component with the extended logic)
const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, passwordverify, termsOfService }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      passwordverify: passwordverify || "",
      termsOfService: termsOfService || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    termsOfService: Yup.bool()
      .test(
        "consent",
        "You have to agree with our Terms and Conditions!",
        value => value === true
      )
      .required("You have to agree with our Terms and Conditions!"),
    email: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(8, "Password must be 8 characters or longer"),
    passwordverify: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    )
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  }
})(Form);

export default FormikUserForm;
