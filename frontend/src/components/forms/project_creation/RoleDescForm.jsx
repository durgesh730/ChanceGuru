import React, { useState } from "react";

const RoleDescForm = ({ display }) => {
    const roleData = JSON.parse(localStorage.getItem("roles"));
    const [active, setactive] = useState(roleData ? roleData[0].id : []);
    const [showchar, setshowchar] = useState([]);
    const [charData, setcharData] = useState({
        name: "",
        gender: "",
        details: "",
        age: ""
    })
    const [character, setcharacter] = useState([]);
    let show = {};
    if (display) {
        show = { display: "block" };
    } else {
        show = { display: "none" };
    }

    const updateChar = (id) => {
        let bool = false;
        character.forEach(item => {
            if (item.rId === id) {
                setshowchar(item.chr);
                bool = true;
            }
        })
        if (!bool) {
            setshowchar([]);
        }
    }

    const addChar = () => {
        if (charData.age === "" || charData.details === "" || charData.gender === "" || charData.name === "") {
            alert("All fields are required");
            return;
        }
        let bool = false;

        character.forEach(item => {
            if (item.rId === active) {
                const data = item.chr;
                const newData = [...data, charData];
                item.chr = newData;
                bool = true;
            }
        })
        if (!bool) {
            setcharacter((prev) => [...prev, { rId: active, chr: [charData] }])
        }

        updateChar(active);
    }

    return (
        <>
            {" "}
            {
                <div className="form-body" style={show}>
                    <div className="form-container">
                        <div className="form-head">Role Description</div>
                        <div className="form-desc">Brief us about each role's description.</div>
                        <div className="form-toggle d-flex justify-content-between  ">
                            {roleData?.map((item, index) => {
                                return (
                                    <>
                                        <div
                                            className={`toggle-option ${active === item.id && "active-toggle"}`}
                                            onClick={() => { setactive(item.id); updateChar(item.id); }}
                                        >
                                            {item.roles}
                                        </div>
                                    </>
                                )
                            })}
                        </div>

                        <div>
                            <table className="charTable" style={{display : `${showchar.length == 0 ? "none" : ""}`}} >
                                <tr>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Details</th>
                                    <th>Age</th>
                                </tr>
                                {
                                    showchar?.map(e => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{e.name}</td>
                                                    <td>{e.details}</td>
                                                    <td>{e.gender}</td>
                                                    <td>{e.age}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </table>
                        </div>
                        <div>

                            <input type="button" className="full-width-btn" value="Add Another Character" />
                            <input type="text" onChange={(e) => { setcharData({ ...charData, name: e.target.value }) }} className="form-control" placeholder="Character Name" />
                            <select onChange={(e) => { setcharData({ ...charData, gender: e.target.value }) }} className="form-control form-select">
                                <option value="" disabled selected>
                                    Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <textarea
                                onChange={(e) => { setcharData({ ...charData, details: e.target.value }) }}
                                name=""
                                id=""
                                className="form-control text-area"
                                rows="5"
                                placeholder="Details..."
                                maxLength="250"
                            ></textarea>
                            <select className="form-control form-select" onChange={(e) => { setcharData({ ...charData, age: e.target.value }) }} >
                                <option value="" disabled selected>
                                    Age
                                </option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                            </select>
                            <div className="row">

                                <p className="col-1"></p>
                                <input onClick={(e) => { e.preventDefault(); addChar() }}
                                    type="submit"
                                    className="col-7 save-btn btn btn-lg btn-block my-2"
                                    value="Save"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }{" "}
        </>
    );
};

export default RoleDescForm;
