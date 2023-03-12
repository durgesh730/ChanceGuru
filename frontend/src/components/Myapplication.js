import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';
import Allapplications from './Allapplications';
import Topbar from './mini_components/Topbar'

const Myapplication = () => {
    const location = useLocation();
    const data = location.state
    return (
        <>
            <Topbar />
            <div className="container">
                <div className="b_table my-4 ">
                    <table>
                        <thead>
                            <td>Project Name</td>
                            <td>Role </td>
                            <td>Character</td>
                            <td>Update</td>
                            <td>Status</td>
                        </thead>
                        {data?.map((item) => {
                            return (
                                <tbody>
                                    <Allapplications pid={item.pId} date = {item.updatedAt}
                                        status={item.status} charId={item.charId}
                                        roleId={item.roleId} />
                                </tbody>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
        </>
    )
}

export default Myapplication
