import React, { useEffect, useState } from 'react'
import server from './server';

const Allapplications = ({ pid, charId, roleId, date,status }) => {
    const [project, setProject] = useState()
    const da = date?.slice(0, 15);

    const handleSearch = async () => {
        const data = await fetch(`${server}/project/oneproject/${pid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await data.json();
        setProject(res)
    };

  

    useEffect(() => {
        handleSearch();
    }, [])

    return (
        <>
            {/* <button onClick={myFunction} > check </button>
         <div id="snackbar">Some text some message..</div> */}
            
            <td>{project?.basicInfo?.name}</td>
            {
                project?.roles?.map((item) => {
                    console.log(item.characters, "item")
                    return (
                        <>
                            {item._id === roleId ? (
                                <td>{item.role}</td>
                            ) : ('')}
                        </>
                    )
                })
            }

            <td>
                {project?.roles?.map((item) => {
                        return (
                            <>
                                {item.characters?.map((data) => {
                                    return (
                                        data._id === charId ? (
                                            <tr>
                                                {data.name}

                                            </tr>
                                        ) : ('')
                                    )
                                })
                                }
                            </>
                        )
                    })
                }
            </td>
            <td>{da?da:"Not Available"}</td>
            <td>{status}</td>
        </>
    )
}

export default Allapplications
