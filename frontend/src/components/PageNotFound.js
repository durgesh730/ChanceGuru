import React from 'react'
import pic from "../assets/images/not-found@3x.png"

const PageNotFound = () => {
    return (
        <>
            <div className='container'>
                <div className=' notfound text-center'>
                    <div className='mx-auto' >
                        <img src={pic}></img>
                    </div>

                    <div className='text-center mx-auto '>
                        <h2 className='my-4'>No Influncer found</h2>
                    </div>
                    <div className='text-center mx-auto '>
                        <span className='my-4'>We can not find any result from your search. Try other Name or filters!</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound
