import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { setUserData,setUser} from "../../../store/SingUserToggler/actions";

class LoginContainer extends React.Component {
  render() {
    return <Login toggleModal={this.props.toggleModal} setUserData={this.props.setUserData} handleChange={this.props.handleChange} putuserdata={this.props.putuserdata} userChange={this.props.userChange} setUser={this.props.setUser} handleClose={this.props.handleClose}/>;
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = {
  setUserData,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
