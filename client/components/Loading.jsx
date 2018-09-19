import React from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 5px auto;
  border-color: red;
`;

const Loading = props => {
  return (
    <div>
      {props.isFetching && (
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={90}
          color={"#123abc"}
          loading={props.isFetching}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.auth.isFetching
  };
};

export default connect(mapStateToProps)(Loading);
