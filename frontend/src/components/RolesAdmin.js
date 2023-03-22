import React, { useEffect, useState } from 'react'
import Topbar from './mini_components/Topbar'
import '../App.css'
import axios from 'axios'
import server from './server'

const RolesAdmin = () => {

    const [roles, setRoles] = useState();
    var modal = document.getElementById("myModal");
    const [input, setInput] = useState(true);
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

    const role = useInput("");

    function closeModal() {
        modal.style.display = "none";
    }

    function edithandle(item) {
        setInput(false)
        modal.style.display = "block";
        role.onSet(item.role);
        setId(item._id);
    }

    function HandalDelete() {
        setInput(true)
        axios.delete(`${server}/admin/rolesdelete/${id}`)
            .then(() => {
            })
            .catch((err) => {
                console.log(err);
            })
        modal.style.display = "none";
    }

    const handleSave = async () => {
        const res = await fetch(`${server}/admin/savedRole/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: role.value })
        });
        const response = await res.json();
        modal.style.display = "none";
        window.location.reload();
    }

    const getuserData = () => {
        axios
            .get(`${server}/admin/roles`)
            .then((res) => {
                if (res !== null) {
                    setRoles(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getuserData();
    }, [])

    return (
        <>
            <Topbar />
            <div className='container'>
                <div className="roles">
                    <table className='rolestable' >
                        <tr>
                            <th>S.no</th>
                            <th>Roles</th>
                        </tr>
                        {roles?.map((items, index) => {
                            return (
                                <>
                                    <tr key={index} className="my-4" >
                                        <td>{index + 1}</td>
                                        <td>
                                            {items.role}
                                        </td>
                                        <td className='btn roles-btn mx-4 my-1' onClick={() => { edithandle(items) }} >Edit</td>
                                        <td className='btn roles-btn mx-4 my-1' onClick={() => { handleOpenmodal(items._id) }} >Delete</td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>
                </div>


                <div id="myModal" className="modal text-center">
                    <div className="modal-content my-4 ">
                        {
                            (input) ?
                                <span style={{ fontSize: '1.4rem' }} className='my-4'>Do You want To delete It!</span>
                                :
                                <div className='my-4' >
                                    <h2 className='my-4' >Let's Edit the Roles! </h2>
                                    <input aria-describedby="inputGroup-sizing-sm" value={role.value} onChange={role.onChange}
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
        </>
    )
}

export default RolesAdmin

