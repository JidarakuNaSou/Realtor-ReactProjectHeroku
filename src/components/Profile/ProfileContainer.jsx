import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";

class ProfileContainer extends React.Component {
  render() {
    return (
      <Profile
        last_name={this.props.last_name}
        first_name={this.props.first_name}
        img_url={this.props.img_url}
        signin_user={this.props.img_url}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    last_name: state.signtouser.last_name,
    first_name: state.signtouser.first_name,
    img_url: state.signtouser.img_url,
    signin_user: state.signtouser.signin_user
  };
};

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
