import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState =(props)=>{
    // const s1={
    //     "name":"Komal",
    //     "class": "7c"
    // }
    // const [state, setState] = useState(s1);
    // const update =()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name":"Komal Singh",
    //             "class": "10c" 
    //         })
    //     },1000)
    // }
    const notesInitial = [
        {
          "_id": "662a1bca7909849b222976b8",
          "user": "662a0220d244bbb6d1bca898",
          "title": "My Title",
          "description": "Please take notes carefully",
          "tag": "personal",
          "date": "2024-04-25T09:00:58.606Z",
          "__v": 0
        },
        {
            "_id": "662a1bca7909849b222976b8",
            "user": "662a0220d244bbb6d1bca898",
            "title": "My Title",
            "description": "Please take notes carefully",
            "tag": "personal",
            "date": "2024-04-25T09:00:58.606Z",
            "__v": 0
          },
          {
            "_id": "662a1bca7909849b222976b8",
            "user": "662a0220d244bbb6d1bca898",
            "title": "My Title",
            "description": "Please take notes carefully",
            "tag": "personal",
            "date": "2024-04-25T09:00:58.606Z",
            "__v": 0
          },
          {
            "_id": "662a1bca7909849b222976b8",
            "user": "662a0220d244bbb6d1bca898",
            "title": "My Title",
            "description": "Please take notes carefully",
            "tag": "personal",
            "date": "2024-04-25T09:00:58.606Z",
            "__v": 0
          },
          {
            "_id": "662a1bca7909849b222976b8",
            "user": "662a0220d244bbb6d1bca898",
            "title": "My Title",
            "description": "Please take notes carefully",
            "tag": "personal",
            "date": "2024-04-25T09:00:58.606Z",
            "__v": 0
          },

      ]
      const[notes, setnotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;