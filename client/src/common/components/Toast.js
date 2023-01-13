import React from "react"

const Toast = ({ msg, className, showToast }) => {
    console.log(msg);
    return (<div className={`toast align-items-center text-white border-0 fade ${className}`} id="liveToast" role="alert" aria-live="assertive" aria-atomic="true" style={{display: showToast ? 'block' : 'none', position: "absolute",top:"10%",right:"0"}}>
        <div className="d-flex">
            <div className="toast-body">
                {msg}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>)
}

export default Toast;