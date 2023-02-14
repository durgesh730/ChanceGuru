import React, { useEffect, useState } from 'react'
import SubViewProfile from './SubViewProfile';
import axios from 'axios'
import StatusSide from './StatusSide';

const SubmissionStatus = ({ id }) => {

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
    }, [])

    return (
        <>
            <div className="aa_body">
                <hr />
                <div className="b_table">
                    <table>
                        <thead>
                            <td>Applocant Name</td>
                            <td>Auditioned For</td>
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
                                                    <StatusSide userId={item.userId} />
                                                    <td>{item.status}</td>
                                                    <SubViewProfile userId={item.userId} />
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
        </>
    )
}

export default SubmissionStatus
