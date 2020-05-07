import React, { Props } from 'react';
import TextField from '@material-ui/core/TextField';

interface EmailInputProps {
    email: string;
    onChange: (event:any) => void;
  }
  

class EmailInput extends React.Component<EmailInputProps>{
    render(){
        //const email:string = this.props.email;
        //const onChange = this.props.onChange;
        return  <TextField
        id="standard-name"
        label="Enter Email"
        value={this.props.email}
        onChange={this.props.onChange}
        margin="normal"
      />
    }

}

export default EmailInput;