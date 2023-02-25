import React from 'react'
import edit from "../../assets/icons/edit.svg"
import del from "../../assets/icons/delete.svg"


function CharacterCard({index,cardData,toEdit,setToEdit}) {
    // console.log(cardData.name)
    // console.log(cardData.desc)

  return (
    <div className='border px-4 py-4 mx-2 ' >
        <span>{cardData.name +": "+cardData.gender.toUpperCase()+" ,"+cardData.age}</span>
        <span className='mx-4' ><button onClick={(e)=>{ e.preventDefault(); setToEdit({...cardData,indexInChars:index}); console.log(toEdit)}}><img src ={edit}  alt="" /></button></span>
        <span><img src ={del} alt="" /></span>
        <p> {cardData.desc} </p>
    </div>
  )
}

export default CharacterCard