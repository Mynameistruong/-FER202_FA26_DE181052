import React from 'react';
import { Button } from 'react-bootstrap';

const AppButton = ({ variant = 'primary', children, ...rest }) => {
  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default AppButton;