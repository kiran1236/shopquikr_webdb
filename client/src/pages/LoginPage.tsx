import React from 'react';
import '../App.css';
import EmailInput from '../input/EmailInput';
import Typography from '@material-ui/core/Typography';
import PasswordInput from '../input/PasswordInput';
import SubmitButton from '../input/SubmitButton';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Axios from 'axios';
import { History } from 'history';

const sleep = (milliseconds:any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  interface LoginPageProps extends RouteComponentProps<any>{
    history : History;
  }

  interface LoginPageState {
    name: string;
    emailAddress: string;
    password: string;
    user_credentials: any;
    snackbaropen: any;
    snackbarmsg: string;
  }


class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

    constructor(props:LoginPageProps) {
        super(props);
        this.state = {
            name: '',
            emailAddress: '',
            password: '',
            user_credentials: [],
            snackbaropen: false,
            snackbarmsg: ''
        };
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailAddressChange(event:any) {
        console.log("handleEmailAddressChange called" + event.target.value);
        this.setState({ emailAddress: event.target.value });
    }
    handlePasswordChange(event:any) {
        console.log("handlePasswordChange called" + event.target.value);
        console.log(event.target.value.length);
        this.setState({ password: event.target.value });
    }
    snackbarClose = (event:any) => {
        this.setState({snackbaropen:false});
    }

    async logout() {
        console.log("logout called");
        try {
                const response = await Axios.delete('/cart/logout');
                console.log(response.data);
                if(response.data === "success"){
                    this.setState({snackbaropen:true, snackbarmsg:"Logged out from the current session"});
                    sleep(1000).then(() => { this.props.history.push('/'); }); 
                }
                /*
                else if(response.data === "failed"){
                    this.setState({snackbaropen:true, snackbarmsg:"No User logged in "});
                    sleep(1000).then(() => { this.props.history.push('/'); }); 
                }*/
            } catch (error) {
                console.log("Coming in catch");
                console.log(error);
                /*
                if(error.response.status === 452){
                    this.setState({snackbaropen:true, snackbarmsg:"An error occured, but logged you out"});
                    this.props.history.push('/');
                }*/
            }
            
        }

    async componentDidMount() {  
        try {
          await this.logout();  // it will wait here untill function finishes
        } catch(err) {}
    }

    async handleSubmit(event:any) {
        console.log("handleSubmit called");
        const emailAddress:string = this.state.emailAddress;
        const password:string = this.state.password;
        if(password.length < 6){
            this.setState({snackbaropen:true, snackbarmsg:"Password should be of length min 6 characters"});
        }
        else if(!emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({snackbaropen:true, snackbarmsg:"Email address not valid"});
        }
        else{
            try {
                const { emailAddress,password } = this.state;
                const data = { email: emailAddress, password: password };
                const response = await Axios.post('/cart/login', data);
                console.log(response.data);
                if(response.data){
                    console.log("user is "+response.data.name);
                    this.setState({snackbaropen:true, snackbarmsg:"LogIn Successful"});
                    sleep(1000).then(() => { 
                        const userName = "dummy";
                        this.props.history.push({pathname: '/products', state: { detail: response.data }}); 
                    }); 
                }
            } catch (error) {
                console.log("Coming in catch");
                console.log(error.response.status);
                if(error.response.status === 452){
                    this.setState({snackbaropen:true, snackbarmsg:"Username or password is wrong"});
                }
            }
        }
    
    
    }
    


    render() {
        const { emailAddress } = this.state;
        const { password } = this.state;
        return (
            <div className="lcontainer">
                <Typography variant={"h4"}>
                    Log In
                    </Typography>
                <EmailInput email={emailAddress} onChange={this.handleEmailAddressChange} />
                <br/>
                <PasswordInput password={password} onChange={this.handlePasswordChange} />
                <br/>
                <SubmitButton onClick={this.handleSubmit}/>
                <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration = {2000} onClose={this.snackbarClose}
                    message={this.state.snackbarmsg} action={[
                        <IconButton key='close' arial-label='Close' color='inherit' onClick={this.snackbarClose}>
                            X
                        </IconButton>
                        ]}/>

            </div>
        );
    }
}

export default withRouter(LoginPage);