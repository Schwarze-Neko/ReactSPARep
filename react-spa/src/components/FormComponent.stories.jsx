import React from 'react';
import FormComponent from './FormComponent';

export default {
  title: 'Components/FormComponent', // Category and name of the component in Storybook
  component: FormComponent,          // Component being tested
};

// Default state of the component
export const Default = () => <FormComponent />;
