import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  setUserData,
} from "../../store/SingUserToggler/actions";

class ProfileContainer extends React.Component {
  render() {
    return (
      <Profile
        last_name={this.props.last_name}
        first_name={this.props.first_name}
        user_image={this.props.user_image}
        signin_user={this.props.signin_user}
        phone = {this.props.phone}
        setUserData={this.props.setUserData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    last_name: state.signtouser.last_name,
    first_name: state.signtouser.first_name,
    user_image: state.signtouser.user_image,
    signin_user: state.signtouser.signin_user,
    phone : state.signtouser.phone,
  };
};

const mapDispatchToProps = {
  setUserData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
