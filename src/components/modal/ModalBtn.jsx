import { bindActionCreators } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setModalState } from "../../redux/features/globalSlice";

class ModalBtn extends Component {
  render() {
    const { modalState, setModalState, title } = this.props;
    return (
      <label onClick={() => setModalState(!modalState)} htmlFor="my_modal_6">
        {title}
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setModalState: setModalState }, dispatch);
};
const mapToPropsState = (state) => {
  return { modalState: state.globalSlice.modalState };
};

export default connect(mapToPropsState, mapDispatchToProps)(ModalBtn);
