import React, { useEffect, useState } from 'react'
import SubViewProfile from './SubViewProfile';
import axios from 'axios'
import StatusSide from './StatusSide';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import godfather from "../assets/images/godfather.png";

const SubmissionStatus = ({a , project , id }) => {
    const [active, setActive] = useState(false);
    const [cards, setcards] = useState();
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
                    <span>{cards.length}</span>
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
                    <div className="b_table">
                        <table>
                            <thead>
                                <td>Applocant Name</td>
                                <td>Applied For</td>
                                <td>Status</td>
                                <td></td>
                            </thead>
                            <tbody>

                                {cards?.map((item, index) => {
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
