import { useState,useContext,useEffect } from "react";

function Widget(props) {
    const city = props.data

    const cityWidget = city.map((ct,index)=>
        <div key={index} className="city-widget">
            {ct.dt_txt}

        </div>
    )
    return (
        <div className="widget-block">
            {cityWidget}
        </div>
    )
}

export default Widget