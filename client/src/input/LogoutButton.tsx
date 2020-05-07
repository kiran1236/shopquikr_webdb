import React, { Component } from 'react'
import Button from '@material-ui/core/Button';


interface LogoutButtonProps {
  onClick: (event:any) => void;
}

export class LogoutButton extends Component<LogoutButtonProps> {
    render() {
        const {onClick} = this.props;
          return (
              <Button variant="contained" color="primary" onClick={onClick}>
              Logout
            </Button>
          )
      }
}
export default LogoutButton
