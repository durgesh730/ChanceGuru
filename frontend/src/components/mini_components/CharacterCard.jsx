import React from 'react'
import edit from "../../assets/icons/edit.svg"
import del from "../../assets/icons/delete.svg"


function CharacterCard({index,cardData,toEdit,setToEdit}) {

  return (
    <div>
        <span>{cardData.name +": "+cardData.gender.toUpperCase()+" ,"+cardData.age}</span>
        <span><button onClick={(e)=>{ e.preventDefault(); setToEdit({...cardData,indexInChars:index}); console.log(toEdit)}}><img src ={edit}  alt="" /></button></span>
        <span><img src ={del} alt="" /></span>
    </div>
  )
}

export default CharacterCard