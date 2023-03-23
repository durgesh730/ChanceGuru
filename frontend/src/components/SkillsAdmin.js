import React, { useEffect, useState } from 'react'
import Topbar from './mini_components/Topbar'
import '../App.css'
import axios from 'axios'
import server from './server'

const SkillsAdmin = () => {

    const [skills, setSkills] = useState();
    var modal = document.getElementById("myModal");
    const [input, setInput] = useState(true);
    var modaltwo = document.getElementById("myModal2");
    const [id, setId] = useState();

    function handleOpenmodal(id) {
        setInput(true)
        modal.style.display = "block";
        setId(id);
    }

    const useInput = (initialvalue) => {
        const [value, setValue] = useState(initialvalue);
        const handleChange = (event) => {
            setValue(event.target.value);
        };
        const changeValue = (v) => {
            setValue(v);
        }
        return {
            value,
            onChange: handleChange,
            onSet: changeValue
        };
    }

    const skill = useInput("");

    function closeModal() {
        modal.style.display = "none";
    }

    function closeModaltwo() {
        modaltwo.style.display = "none";
    }

    const handleAddRoles = () => {
        modaltwo.style.display = "block";
    }

    function edithandle(item) {
        setInput(false)
        modal.style.display = "block";
        skill.onSet(item.skill);
        setId(item._id);
    }

    function HandalDelete() {
        setInput(true)
        axios.delete(`${server}/admin/skilldelete/${id}`)
            .then(() => {
            })
            .catch((err) => {
                console.log(err);
            })
        modal.style.display = "none";
    }

    const handleSave = async () => {
        const res = await fetch(`${server}/admin/savedSkills/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ skill: skill.value })
        });
        const response = await res.json();
        modal.style.display = "none";
        window.location.reload();
    }

    const getuserData = () => {
        axios
            .get(`${server}/admin/skills`)
            .then((res) => {
                if (res !== null) {
                    setSkills(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const [addNew, setNew] = useState({ newRoles: "" })

    const handleAddSkillAndSave = async () => {
        const { newRoles } = addNew;
        const res = await fetch(`${server}/admin/addskill`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newRoles })
        });
        const response = await res.json();
        console.log(response)
        console.log("hgfds")
        modaltwo.style.display = "none";
    }

    useEffect(() => {
        getuserData();
    }, [])

    return (
        <>
            <Topbar />
            <div className='container'>
                <div className="roles d-flex ">
                    <table className='rolestable'>
                        <tr>
                            <th>S.no</th>
                            <th>Skills</th>
                        </tr>
                        {skills?.map((items, index) => {
                            return (
                                <>
                                    <tr key={index} className="my-4" >
                                        <td>{index + 1}</td>
                                        <td>
                                            {items.skill}
                                        </td>
                                        <td className='btn roles-btn mx-4 my-1' onClick={() => { edithandle(items) }} >Edit</td>
                                        <td className='btn roles-btn mx-4 my-1' onClick={() => { handleOpenmodal(items._id) }} >Delete</td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>
                    <div>
                        <button className='btn roles-btn' onClick={handleAddRoles} >Add new Skill </button>
                    </div>
                </div>


                <div id="myModal" className="modal text-center">
                    <div className="modal-content my-4 ">
                        {
                            (input) ?
                                <span style={{ fontSize: '1.4rem' }} className='my-4'>Do You want To delete It!</span>
                                :
                                <div className='my-4' >
                                    <h2 className='my-4' >Let's Edit the Skills! </h2>
                                    <input aria-describedby="inputGroup-sizing-sm" value={skill.value} onChange={skill.onChange}
                                        name='dataInput' />
                                </div>
                        }
                        <div className='my-4' >
                            <span onClick={closeModal} className='btn roles-btn mx-4'>Close</span>
                            {
                                (input) ?
                                    <span onClick={HandalDelete} className='btn roles-btn mx-4'>Confirm</span>
                                    :
                                    <span className='btn roles-btn mx-4 my-1' onClick={handleSave} >Save</span>
                            }
                        </div>
                    </div>
                </div>
            </div>


            <div id="myModal2" className="modal text-center">
                <div className="modal-content my-4 ">
                    <div className='my-4' >
                        <input aria-describedby="inputGroup-sizing-sm"
                            onChange={(event) => {
                                setNew((prev) => ({ ...prev, newRoles: event.target.value }));
                            }}
                            name='dataInput' />
                    </div>
                    <div className='my-4' >
                        <span onClick={closeModaltwo} className='btn roles-btn mx-4'>Close</span>

                        <span className='btn roles-btn mx-4 my-1' onClick={handleAddSkillAndSave} >Save</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SkillsAdmin
