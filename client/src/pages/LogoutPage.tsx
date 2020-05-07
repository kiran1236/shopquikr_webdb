import React from 'react';
import '../App.css';
import { storeProducts, detailProduct } from "../data";
import { ProductConsumer } from "../context";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Axios from 'axios';
import { History } from 'history';

const sleep = (milliseconds:any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  interface LogoutPageProps extends RouteComponentProps<any>{
    history : History;
  }


  interface LogoutPageState {
    snackbaropen: any;
    snackbarmsg: string;
  }

class LogoutPage extends React.Component<LogoutPageProps, LogoutPageState> {

    constructor(props:LogoutPageProps) {
        super(props);
        this.state = {
            snackbaropen: false,
            snackbarmsg: ''
        };
        
        this.logout = this.logout.bind(this);

        
    }
    async logout() {
        console.log("logout called");
        try {
                const response = await Axios.delete('/cart/logout');
                console.log(response.data);
                if(response.data === "success"){
                    this.setState({snackbaropen:true, snackbarmsg:"Logout Successful"});
                    sleep(1000).then(() => { this.props.history.push('/'); }); 
                }
                else if(response.data === "failed"){
                    this.setState({snackbaropen:true, snackbarmsg:"No User logged in "});
                    sleep(1000).then(() => { this.props.history.push('/'); }); 
                }
            } catch (error) {
                console.log("Coming in catch");
                console.log(error);
                if(error.response.status === 452){
                    this.setState({snackbaropen:true, snackbarmsg:"An error occured, but logged you out"});
                    this.props.history.push('/');
                }
            }
            
        }

    async componentDidMount() {  
        try {
          await this.logout();  // it will wait here untill function finishes
        } catch(err) {}
    
       
    }


    snackbarClose = (event:any) => {
        console.log("snackbarClose called");
        this.setState({snackbaropen:false});
    }

   
    
    
    
    


    render() {

            return(
            <div>
                
          
                
          <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={this.state.snackbaropen} autoHideDuration = {2000} onClose={this.snackbarClose}
          
                    message={this.state.snackbarmsg} action={[
                        <IconButton key='close' arial-label='Close' color='inherit'  onClick={this.snackbarClose}>
                            X
                        </IconButton>
                        ] }/>

            </div>
        );
                   
    }
}

export default withRouter(LogoutPage);