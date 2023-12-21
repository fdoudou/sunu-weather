import { useState, useContext } from "react";
import { MyContext } from "./Contextor";

function WSearch(props) {
    const { query, updateQuery, handleSubmit } = useContext(MyContext);

    return (
        <form className="search-zone jma-pdg-top jma-pdg-bottom" onSubmit={handleSubmit}>
            <div style={{position:"relative"}}>
                <input className="search-bar" type="search" name="searchbar" value={query} onChange={updateQuery} placeholder="Rechercher une ville, une région, un pays, etc"></input>
                <svg onClick={handleSubmit} className="jma-svg search-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        </form>
    )
}

export default WSearch;