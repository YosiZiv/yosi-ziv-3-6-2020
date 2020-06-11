import React from "react";
import { connect } from "react-redux";
const Spinner = ({ loading, themeMode }) => {
  const theme = themeMode === "dark" ? "text-light" : "text-dark";
  const loadingUi = loading ? (
    <div className="text-center">
      <div
        style={{ marginTop: "40px", width: "40px", height: "40px" }}
        className={"spinner-border " + theme}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : null;
  return loadingUi;
};
const mapStateToProps = ({ ui: { loading, themeMode } }) => {
  return {
    loading,
    themeMode,
  };
};
export default connect(mapStateToProps)(Spinner);
