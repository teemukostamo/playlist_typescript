import React from 'react';
import { ErrorMessage, Field, FieldProps, FormikProps } from 'formik';
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react';

export enum UserLevel {
  'DJ' = 1,
  'Staff' = 2,
  'Admin' = 3,
}

export type UserLevelOptions = {
  value: UserLevel;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: UserLevelOptions[];
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

type CheckboxProps = {
  id: string;
  name: string;
  className: string;
};

export const Checkbox = ({
  id,
  name,
  className,
}: CheckboxProps): JSX.Element => (
  <Field
    name={name}
    render={({ field }: FieldProps) => (
      <input
        id={id}
        {...field}
        type='checkbox'
        className={className}
        checked={true}
        name='status'
      />
    )}
  />
);
