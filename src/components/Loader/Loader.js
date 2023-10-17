import React from 'react'
import ClipLoader from "react-spinners/FadeLoader";

function Loader() {
    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
            <div>
                <ClipLoader color='turquoise' />
            </div>

        </div>
    )
}

export default Loader