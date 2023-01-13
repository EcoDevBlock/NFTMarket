import React from "react";

const Loader = () => {
    return (<div className="text-center m-5 p-5">
        <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>)
}

export default Loader;