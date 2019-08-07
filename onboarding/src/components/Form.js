import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, withFormik } from "formik";
import { Form as FormikForm } from "formik";
import * as Yup from "yup";

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
      <FormikForm>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="text" name="email" placeholder="email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <label className="checkbox-container">
          I understand the terms of service
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>

        <button type="submit">Submit!</button>
      </FormikForm>

      {users.map(user => (
        <p key={user.id}>{user.species}</p>
      ))}
    </div>
  );
};

// Higher Order Component - HOC
// Hard to share component / stateful logic (custom hooks)
// Function that takes in a component, extends some logic onto that component,
// // returns a _new_ component (copy of the passed in component with the extended logic)
// const FormikAnimalForm = withFormik({
//   mapPropsToValues({ species, size, notes, food, vaccinations }) {
//     return {
//       vaccinations: vaccinations || false,
//       food: food || "",
//       species: species || "",
//       size: size || "",
//       notes: notes || ""
//     };
//   },

//   validationSchema: Yup.object().shape({
//     species: Yup.string().required(),
//     size: Yup.string().required(),
//     notes: Yup.string()
//   }),

//   handleSubmit(values, { setStatus }) {
//     axios
//       .post("https://reqres.in/api/users/", values)
//       .then(res => {
//         setStatus(res.data);
//       })
//       .catch(err => console.log(err.response));
//   }
// })(AnimalForm);

export default Form;
