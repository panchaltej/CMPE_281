import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../public/scooter.css';
import * as AddUserAPI from '../../api/AddUserAPI';
import {bindActionCreators} from 'redux';
import {LoadMembers} from '../../actions/user';
import * as GetMembersAPI from '../../api/getmembersAPI';

class AddUser extends Component {

    state = {
        userdata: {
            firstname: '',
            lastname: '',
            emailid: '',
            password: '',
            departmentid: this.props.userdetail.departmentid
        },
        isAdded: ''
    };

    handleAddUser = () => {
        AddUserAPI
            .addUser(this.state.userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({isAdded: true});
                    var departmentid = this.props.userdetail.departmentid;
                    GetMembersAPI
                        .getMembers({departmentid})
                        .then((obj) => {
                            this
                                .props
                                .LoadMembers(obj);
                        });
                } else if (status === 401) {
                    this.setState({isAdded: false});
                }
            });
    }

    render() {
        return (
            <div>

                <form>
                    <div className="form-group">
                        <h4>Add Member</h4>
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
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        LoadMembers: LoadMembers
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        userdetail: state.userdetail,
        members: state.members
    }       
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);