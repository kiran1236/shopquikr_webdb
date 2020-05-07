import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

interface SubmitButtonProps {
  onClick: (event:any) => void;
}

class SubmitButton extends Component<SubmitButtonProps> {
    render() {
      //const {onClick} = this.props;
        return (
            <Button variant="contained" color="primary" onClick={this.props.onClick}>
            Submit
          </Button>
        )
    }
}

export default SubmitButton


