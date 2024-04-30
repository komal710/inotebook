import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState =(props)=>{
  const host="http://localhost:5000"
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
    const notesInitial = []
      const[notes, setnotes] = useState(notesInitial)

       // Get all Note
     const getNote = async()=>{
      //To call API
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
       method: "GET", 
       headers: {
         "Content-Type": "application/json",
         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyYTAyMjBkMjQ0YmJiNmQxYmNhODk4In0sImlhdCI6MTcxNDAyOTA4OH0.JwU9oNhe2HTtPi-wRSU4fqK2bK3oJJDWJjJwzMUo3Qw"
       }
       });
       const json = await response.json()
      console.log(json)
      setnotes(json)    
     }

     // Add a Note
     const addNote = async(title, description,tag)=>{
     //To call API
      const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyYTAyMjBkMjQ0YmJiNmQxYmNhODk4In0sImlhdCI6MTcxNDAyOTA4OH0.JwU9oNhe2HTtPi-wRSU4fqK2bK3oJJDWJjJwzMUo3Qw"
      },
  
      body: JSON.stringify({title,description,tag}) });
  
    //const json = response.json();
     console.log("Adding a new Note")
      const note = {
        "_id": "662a1bca7909849b222976b85",
        "user": "662a0220d244bbb6d1bca898",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-04-25T09:00:58.606Z",
        "__v": 0
      };
      setnotes(notes.concat(note))
     }
     // Delete a Note
     const deleteNote = async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyYTAyMjBkMjQ0YmJiNmQxYmNhODk4In0sImlhdCI6MTcxNDAyOTA4OH0.JwU9oNhe2HTtPi-wRSU4fqK2bK3oJJDWJjJwzMUo3Qw"
        }});  
      const json = response.json(); 
      console.log(json)
      console.log("Deleting the note with id" + id);
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setnotes(newNotes)
     }
     // Edit a Note
     const editNote = async(id,title, description,tag)=>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyYTAyMjBkMjQ0YmJiNmQxYmNhODk4In0sImlhdCI6MTcxNDAyOTA4OH0.JwU9oNhe2HTtPi-wRSU4fqK2bK3oJJDWJjJwzMUo3Qw"
        },
    
        body: JSON.stringify({title,description,tag}) });
    
      const json = response.json(); 
      

      //logic to edit in client
      for(let index = 0; index < notes.length; index++){
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
     }
    
    
      return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote,  getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;