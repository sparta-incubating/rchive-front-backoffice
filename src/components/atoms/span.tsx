import React, { ComponentProps } from 'react';

interface SpanProps extends ComponentProps<'span'> {}

const Span = ({ ...props }: SpanProps) => {
  return <span {...props} className="text-sm text-primary-400" />;
};

export default Span;
