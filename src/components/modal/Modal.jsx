import { bindActionCreators } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setModalState } from "../../redux/features/globalSlice";

class Modal extends Component {
  render() {
    const {
      modalState,
      setModalState,
      children,
      title,
      description,
      modalAction,
    } = this.props;

    return (
      <>
        <input
          type="checkbox"
          checked={modalState}
          id="my_modal_6"
          className="modal-toggle"
          defaultChecked={false}
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="divider"></div>
            <p>{description}</p>
            {/* modal body  */}
            {children}

            {/* alternate modal action  */}
            {modalAction && (
              <div className="modal-action">
                <label
                  onClick={() => setModalState(true)}
                  htmlFor="my_modal_6"
                  className="btn btn-error"
                >
                  cancel
                </label>
                <button className="btn btn-primary" type="submit">
                  add playlist
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setModalState: setModalState }, dispatch);
};
const mapToPropsState = (state) => {
  return { modalState: state.globalSlice.modalState };
};

export default connect(mapToPropsState, mapDispatchToProps)(Modal);
