import React from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { Form } from 'semantic-ui-react';

interface SelectFieldOptions {
  key?: number | string;
  value: number | string;
  label: string;
}

type SelectFieldProps = {
  name: string;
  label: string;
  options: SelectFieldOptions[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  type: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} type='text' />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const RequiredTextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field required>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} type='text' />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface PasswordProps extends FieldProps {
  label: string;
  placeholder: string;
  type: string;
}

export const PasswordField: React.FC<PasswordProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} type='password' />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const RequiredPasswordField: React.FC<PasswordProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field required>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} type='password' />
    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
