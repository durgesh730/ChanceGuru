import React from "react";

const Searchbar = () => {
    return (
        <div className="searchbar">
            <div className="search-input">
                <input type="text" className="form-control" placeholder="Search..." />
                <button className="btn">Search</button>
            </div>
        </div>
    );
};

export default Searchbar;
