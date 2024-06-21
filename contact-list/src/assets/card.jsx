import React from "react";

function Card () {
    return ( 

        <div className="container border rounded d-flex flex-row" style={{ width: '50vw'}}>
            <div className="col-3">
                Hello
            </div>
            <div className="col-6 d-flex flex-column align-items-start">
                <div><p>Name</p></div>
            
                <div className="d-flex flex-row"><i class="fa-solid fa-location-pin"></i>&nbsp;&nbsp;<p>Location</p></div>
                <div className="d-flex flex-row"><i class="fa-solid fa-phone"></i>&nbsp;&nbsp;<p>Phone</p></div>
                <div className="d-flex flex-row"><i class="fa-solid fa-envelope"></i>&nbsp;&nbsp;<p>Mail</p></div>
            </div>
            <div className="col-3 d-flex flex-row justify-content-end">
                <button><i className="fa-solid fa-pencil bg-white"></i></button>
                <button><i className="fa-solid fa-trash bg-white"></i></button>
            </div>
        </div>
     );
}

export default Card ;