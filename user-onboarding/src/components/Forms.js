import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const Forms = ({ errors, touched, values, status }) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status])
  }, [status]);


  return (
    <div>
      <h1>New User Onboarding</h1>
      <Form>
        <Field
          type='text'
          name='name'
          placeholder='Name'
        />
        {touched.name && errors.name && (
          <p className='error'>{errors.name}</p>
        )}

        <Field
          type='text'
          name='email'
          placeholder='Email'
        />
        {touched.email && errors.email && (
          <p className='error'>{errors.email}</p>
        )}

        <Field
          type='password'
          name='password'
          placeholder='Password'
        />
        {touched.password && errors.password && (
          <p className='error'>{errors.password}</p>
        )}

        Terms of Service
        <Field
          type='checkbox'
          name='terms'
          checked={values.terms}
        />
        {touched.terms && errors.terms && (
          <p className='error'>{errors.terms}</p>
        )}

        <button type='submit'>Submit</button>
      </Form>

      {users.map(user => (
        <ul>
          <li>{user.name}</li>
          <li>{user.email}</li>
        </ul>
      ))}

    </div>
  );
};

const FormikForms = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      terms: terms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required('enter valid email address'),
    password: Yup.string().required('password required'),
    terms: Yup.boolean().oneOf([true])
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    axios.post('https://reqres.in/api/users', values)
      .then(response => {
        setStatus(response.data);
        console.log(response)
        resetForm();
      })
      .catch(err => console.log(err.response));
  }

})(Forms)



export default FormikForms;