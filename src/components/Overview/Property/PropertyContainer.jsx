import Property from "./Property"
import React from "react";
import { connect } from "react-redux";

class PropertyContainer extends React.Component {
  render() {
    return (
      <Property
      property={this.props.property}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    property : state.signtouser.property
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyContainer);
