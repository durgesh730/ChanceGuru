import React from 'react';
import SubViewProfile from '../SubViewProfile';
import { NavLink } from 'react-router-dom';

const Prevnext = (data ) => {
    const card = data.card ;
    const index = data.index ;
    const d = data.d ;
    return (
        <>
        <div className='prevNext'>
            {
                index === 0 ? "" : <SubViewProfile display={true}  index={index - 1} card={card} msg={`Prev`} da={d} /> 
            }
            {
                card.length === index + 1 ?  "" : <SubViewProfile display={true}  index={index + 1} card={card} msg={`Next`} da={d} /> 
            }
        </div>
        </>
    )
}

export default Prevnext;