
import React, { ComponentProps } from 'react'



interface LabelProps extends ComponentProps<'label'>{}



const Label = ({...props}:LabelProps) => {
  return (
   <label {...props}></label>
  )
};

export default Label;
