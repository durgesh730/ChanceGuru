import React, { useEffect, useState } from 'react'
import profile from "../assets/icons/profile1.svg";
import server from './server';

const Images = ({ item }) => {

    const [Images, setImages] = useState()

    const handleSelect = async () => {
        const data = await fetch(`${server}/auth/UserImageFromUserTable/${item.userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const res = await data.json();
        setImages(res)
        console.log(res, "res")
    };

    useEffect(() => {
        handleSelect();
    }, [])

    return (
        <>

            {
                Images?.map((item, i) => {
                    return (
                        <>
                            <img src={item.link ? item.link : profile} />
                        </>
                    )
                })
            }
        </>
    )
}

export default Images
