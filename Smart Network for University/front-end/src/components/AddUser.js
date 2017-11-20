import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import './../public/scooter.css';
import Login from './Login';
import * as AddUserAPI from './../api/AddUserAPI';


class Signup extends Component {

    state = {
        userdata: {
            firstname: '',
            lastname: '',
            emailid: '',
            password: ''
        },
        isAdded : ''
    };

    handleAddUser= () => {
        AddUserAPI.adUser(this.state.userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isAdded: true,
                    });
                    this.props.history.push("/");
                } else if (status === 401) {
                    this.setState({
                        isAdded: false,
                    });
                }
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">
                                <form>
                                    <div className="form-group">
                                        <h1>Add User</h1>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="firstname"
                                            placeholder="First Name"
                                            value={this.state.userdata.firstname}
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        firstname: event.target.value
                                                    }
                                                });
                                            }}/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="lastname"
                                            placeholder="Last Name"
                                            value={this.state.userdata.lastname}
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        lastname: event.target.value
                                                    }
                                                });
                                            }}/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="email"
                                            label="emailid"
                                            placeholder="Email ID"
                                            value={this.state.userdata.emailid}
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        emailid: event.target.value
                                                    }
                                                });
                                            }}/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="password"
                                            label="password"
                                            placeholder="Password"
                                            value={this.state.userdata.password}
                                            onChange={(event) => {
                                                this.setState({
                                                    userdata: {
                                                        ...this.state.userdata,
                                                        password: event.target.value
                                                    }
                                                });
                                            }}/>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.handleAddUser()}>
                                           Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}/>
                <Route exact path="/" render={() => (<Login/>)}/>
            </div>
        );
    }
}

export default withRouter(AddUser);