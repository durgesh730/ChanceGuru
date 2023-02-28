import React, { useEffect, useState } from 'react'
import SubViewProfile from './SubViewProfile';
import axios from 'axios'
import StatusSide from './StatusSide';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const SubmissionStatus = ({ a, ArrayData, project, id }) => {
    const [active, setActive] = useState(false);
    const [cards, setcards] = useState();

    const [Newactive, setNewActive] = useState(0);
    const [leadRoles, setLeadRoles] = useState([])
    const [activeChar, setActiveChar] = useState({})

    const getuserId = () => {
        axios
            .get(`http://localhost:5000/project/Seekers/${id}`)
            .then((res) => {
                setcards(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (project.roles) {
            setLeadRoles(project.roles[0].characters)
            setActiveChar(project.roles[0].characters[0])
        }
    }, [project])

    useEffect(() => {
        getuserId();
    }, []);

    return (
        <>
            <div className="aa_head d-flex justify-content-between">
                <p>{project.basicInfo.name}</p>
                <div>
                    <span>Roles : </span>
                    <span>{project.roles.length}</span>
                </div>
                <div>
                    <span>Character : </span>
                    <span>{a}</span>
                </div>

                <div>
                    <span>Applied by : </span>
                    <span>{cards?.length}</span>
                </div>

                <div className="aa_icon">
                    {active ? (
                        <BsChevronUp onClick={() => setActive(!active)} />
                    ) : (
                        <BsChevronDown onClick={() => setActive(!active)} />
                    )}
                </div>
            </div>
            {active &&
                <div className="aa_body">
                    <hr />

                    <div className="topNavbar">

                        {

                            project.roles.map((i, x) => {
                                return (
                                    <span highlighted={Newactive === x ? "true" : "false"} onClick={() => { setActive(x); setLeadRoles(i.characters); setActiveChar(i.characters[0]) }} >{i.role + ` (${i.characters.length})`}</span>
                                )
                            })

                        }
                    </div>
                    <hr className='mt-1' />



                    <div className="leadRoles" style={{ dispay: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                        {
                            leadRoles.map((p, index) => {

                                return (
                                    <>
                                        <span key={index} highlighted={activeChar === p ? "true" : "false"} onClick={() => setActiveChar(p)} >{p.name}</span>
                                    </>
                                )
                            }
                            )
                        }

                    </div>
                    <hr className='my-3' />

                    <div className="b_table">
                        <table>
                            <thead>
                                <td>Applicant Name</td>
                                <td>Applied For</td>
                                <td>Status</td>
                                <td></td>
                            </thead>
                            <tbody>

                                {cards?.map((item, index) => {
                                    if (activeChar._id == item.charId) {
                                        return (
                                            <>
                                                {
                                                    item.status === "applied" ? (
                                                        <tr>
                                                            <StatusSide roleId={item.roleId} charId={item.charId} project={project} userId={item.userId} />
                                                            <td>{item.status}</td>
                                                            <SubViewProfile display={'/submission'} index={index} card={cards} msg={'View Profile'} />
                                                        </tr>
                                                    )
                                                        : ("")
                                                }
                                            </>
                                        )

                                    }
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

export default SubmissionStatus
