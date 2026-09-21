import React from 'react'

const LogoCompo = ({ notCenter = false }) => {
    return (
        <div className={notCenter ? 'mb-4' : 'mx-auto mb-4'} style={{ width: 'fit-content' }}>
            <h5 className="logo-font fw-bold mb-1" style={{ color: "#1C1C1C" }}>
                <span style={{ color: "#00A9E0" }}>Feel</span> <span style={{ color: "#E6519B" }}>Safe</span> Pvt. Ltd.
            </h5>
            <h6 className="tag-line text-uppercase fw-bold " style={{ color: "rgb(0 128 169)", letterSpacing: "1px", textAlign: 'right' }}>
                हमारा प्रयास आपकी सुरक्षा
            </h6>
        </div>
    )
}

export default LogoCompo
