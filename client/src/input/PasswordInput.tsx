import React from 'react';
import TextField from '@material-ui/core/TextField';

interface PasswordInputProps {
  password: string;
  onChange: (event:any) => void;
}

class PasswordInput extends React.Component<PasswordInputProps>{
    render(){
        //const {password, onChange} = this.props;
        return  <TextField
        id="standard-name"
        label="Enter Password"
        value={this.props.password}
        onChange={this.props.onChange}
        margin="normal"
      />
    }

}

export default PasswordInput;