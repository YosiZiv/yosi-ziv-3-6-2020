import React from "react";
import { connect } from "react-redux";
const Spinner = ({ loading }) => {
  console.log(loading);
  const loadingUi = loading ? (
    <div className="text-center">
      <div
        style={{ width: "20px", height: "20px" }}
        className="spinner-border text-primary"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : null;
  return loadingUi;
};
const mapStateToProps = ({ ui: { loading } }) => {
  return {
    loading,
  };
};
export default connect(mapStateToProps)(Spinner);
