import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormComponent = () => {
  const [formSubmitted, setFormSubmitted] = useState(false); // Tracks form submission attempt

  const initialValues = { name: '', email: '', password: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleFormSubmit = (values, { resetForm }) => {
    console.log('Form Submitted:', values);
    alert('Form successfully submitted!');
    resetForm();
    setFormSubmitted(false); // Reset submission state after successful submission
  };

  return (
    <div className="form-container">
      <h2>Accessible Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form aria-labelledby="form-title">
            {/* Error Summary */}
            {formSubmitted && Object.keys(errors).length > 0 && (
              <div
                role="alert"
                aria-live="polite"
                className="error-summary"
                style={{
                  marginBottom: '1em',
                  color: '#D8000C',
                  backgroundColor: '#FFBABA',
                  padding: '10px',
                }}
              >
                <strong>Please fix the following errors before submitting:</strong>
                <ul>
                  {Object.keys(errors).map((key) => (
                    <li key={key}>
                      <a href={`#${key}`} style={{ textDecoration: 'none' }}>
                        {errors[key]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="form-control"
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby="name-error"
              />
              <ErrorMessage name="name" component="div" id="name-error" className="error-message" />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby="email-error"
              />
              <ErrorMessage name="email" component="div" id="email-error" className="error-message" />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
                aria-required="true"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby="password-error"
              />
              <ErrorMessage
                name="password"
                component="div"
                id="password-error"
                className="error-message"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => setFormSubmitted(true)} // Set submission state to true
              disabled={isSubmitting}
            >
              Submit
            </button>

            {/* Reset Button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFormSubmitted(false); // Reset submission state
              }}
            >
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
