import React from "react";

const Searchbar = ({ setQuery, query, handleSearch }) => {

    return (
        <div className="searchbar">
            <div className="search-input">
                <input type="text" className="form-control" value={query} placeholder="Search..." onChange={(e) => { setQuery(e.target.value) }} />
                <button onClick={handleSearch} className="btn">Search</button>
            </div>
        </div>
    );
};

export default Searchbar;
