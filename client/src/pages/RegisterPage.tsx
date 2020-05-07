import React from 'react';
import NameInput from '../input/NameInput';
import EmailInput from '../input/EmailInput';
import Typography from '@material-ui/core/Typography';
import PasswordInput from '../input/PasswordInput';
import SubmitButton from '../input/SubmitButton';
import localstorage from 'local-storage';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { History } from 'history';


const sleep = (milliseconds:any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


  interface RegisterPageProps extends RouteComponentProps<any>{
    history : History;
  }

  interface RegisterPageState {
    name: string;
    emailAddress: string;
    password: string;
    repassword: string;
    snackbaropen: any;
    snackbarmsg: string;
  }

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {

    constructor(props: RegisterPageProps) {
        super(props);

        this.state = {
            name: '',
            emailAddress: '',
            password: '',
            repassword: '',
            snackbaropen: false,
            snackbarmsg: ''
        };
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    snackbarClose = (event:any) => {
        this.setState({snackbaropen:false});
    }

    handleNameChange(event:any) {
        console.log("handleNameChange called" + event.target.value);
        this.setState({ name: event.target.value });
    }
    handleEmailAddressChange(event:any) {
        console.log("handleEmailAddressChange called" + event.target.value);
        this.setState({ emailAddress: event.target.value });
    }
    handlePasswordChange(event:any) {
        console.log("handlePasswordChange called" + event.target.value);
        this.setState({ password: event.target.value });
    }
    handleRePasswordChange(event:any) {
        console.log("handleRePasswordChange called" + event.target.value);
        this.setState({ repassword: event.target.value });
    }


    async logout() {
        console.log("logout called");
        try {
                const response = await Axios.delete('http://localhost:4000/cart/logout');
                console.log(response.data);
                if(response.data === "success"){
                    this.setState({snackbaropen:true, snackbarmsg:"Logged out from the current session"});
                    sleep(1000).then(() => { this.props.history.push('/register'); }); 
                }

                /*
                else if(response.data === "failed"){
                    this.setState({snackbaropen:true, snackbarmsg:"No User logged in "});
                    sleep(1000).then(() => { this.props.history.push('/register'); }); 
                }*/
            } catch (error) {
                console.log("Coming in catch");
                console.log(error);
                /*
                if(error.response.status === 452){
                    this.setState({snackbaropen:true, snackbarmsg:"An error occured, but logged you out"});
                    this.props.history.push('/register');
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
        const { name } = this.state;
        const { emailAddress } = this.state;
        const { password } = this.state;
        const { repassword } = this.state;
        console.log("coming...");
        let alreadyRegistered=0;
        


        /*
        const user_cred=localstorage.get("user_credentials");
        let alreadyRegistered=0;
        user_cred.forEach(user => {
           const {emailAddress:user_email} = user;
           if(user_email === emailAddress){
            alreadyRegistered=1;
           }
       });*/

       
        if(password !== repassword){
            this.setState({snackbaropen:true, snackbarmsg:"Password doesnt match with each other"});
        }
        else if(password.length < 6 || repassword.length < 6){
            this.setState({snackbaropen:true, snackbarmsg:"Password should be of length min 6 characters"});
        }
        else if(!emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            this.setState({snackbaropen:true, snackbarmsg:"Email address not valid"});
        }
        else{
//        const user = {name, emailAddress, password};
//        const user_cred = localstorage.get("user_credentials");
//        user_cred.push(user);
//        localstorage.set('user_credentials',user_cred);
//        this.setState({snackbaropen:true, snackbarmsg:"Successfully Registered"});
//        sleep(1000).then(() => {
//            this.props.history.push('/login');
//          })


          try {
            const { name,emailAddress,password,repassword } = this.state;
            console.log("name is "+name);
            const data = { firstname: name,lastname: name, email: emailAddress, password: password};
            console.log("data is "+data); 
            const response = await Axios.post('http://localhost:4000/cart/register', data);
            //const { data } = response;
            //this.setState({ users: data });
            console.log(response.data);
            this.setState({snackbaropen:true, snackbarmsg:"Successfully Registered"});
            sleep(1000).then(() => {
                this.props.history.push('/');
              })
    
        } catch (error) {
            console.log(error.response.status);
            if(error.response.status === 501)
                alreadyRegistered=1;
            if(alreadyRegistered===1){
                    console.log("User already registerd with that email id");
                    this.setState({snackbaropen:true, snackbarmsg:"User already registerd with that email id"});
                   }
        }
        }
    }
    render() {
        const { name } = this.state;
        const { emailAddress } = this.state;
        const { password } = this.state;
        const { repassword } = this.state;
        return (

            

            <div className="rcontainer" style={{ padding: '1rem' }}>

                <Typography variant={"h4"}>
                    Register
                    </Typography>
                <NameInput name={name} onChange={this.handleNameChange}  />
                <br />
                <EmailInput email={emailAddress} onChange={this.handleEmailAddressChange} />
                <br/>
                <PasswordInput password={password} onChange={this.handlePasswordChange} />
                <br/>
                <PasswordInput password={repassword} onChange={this.handleRePasswordChange} />
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

export default withRouter(RegisterPage);