import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginAPI from '../api/LoginAPI';
import App from "./App";

class Login extends Component {

    state = {
        userdata: {
            EmailId: '',
            Password: ''
        },
        isLoggedIn: false,
        message: ''
    };

    handleLogin = () => {
        

        var payload;
        payload = {
            EmailId:this.state.userdata.EmailId,
            Password:this.state.userdata.Password
        }


        LoginAPI.doLogin(payload)
        .then((status) => {
            if (status === 201) {
                this.setState({
                    isLoggedIn: true,
                    message: "Welcome to my App..!!"
                });
                this.props.history.push("/App");
            } else if (status === 401) {
                this.setState({
                    isLoggedIn: false,
                    message: "Wrong username or password. Try again..!!"
                });
            }
        });
    }

    render() {
        return (
            <div>
                <Route
                    exact
                    path="/"
                    render={() => (
                    <div className="row justify-content-md-center">
                        <div className="col-md-3">
                            <form>
                                <div className="form-group">
                                    <h1>Login</h1>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Username"
                                        placeholder="Enter Username"
                                        value={this.state.userdata.EmailId}
                                        onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                EmailId: event.target.value
                                            }
                                        });
                                    }}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        label="password"
                                        placeholder="Enter Password"
                                        value={this.state.userdata.Password}
                                        onChange={(event) => {
                                        this.setState({
                                            userdata: {
                                                ...this.state.userdata,
                                                Password: event.target.value
                                            }
                                        });
                                    }}/>
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.handleLogin()}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                            <p>Don't have an account yet? 
	                	        <a href="Signup">Sign Up</a>
	                        </p>
                        </div>
                    </div>
                )}/>
                <Route exact path="/App" render={() => (<App/>)}/>
            </div>
        );
    }
}



export default withRouter(Login);