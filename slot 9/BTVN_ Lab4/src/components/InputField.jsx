import Form from 'react-bootstrap/Form';

const InputField = ({
  id,
  label,
  helpText,
  error,
  as = 'input',
  ...inputProps
}) => (
  <Form.Group className="mb-3" controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as={as}
      isInvalid={Boolean(error)}
      aria-describedby={helpText && !error ? `${id}-help` : undefined}
      {...inputProps}
    />
    {error ? (
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    ) : (
      helpText && <Form.Text id={`${id}-help`}>{helpText}</Form.Text>
    )}
  </Form.Group>
);

export default InputField;
