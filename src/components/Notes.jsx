import { Component } from "react";
import GetButton from "./GetButton";
import NotesList from "./NotesList";
import NotesInput from "./NotesInput";



export default class Notes extends Component {
  state = {
    notes: []
  }

  componentDidMount = () => this.loadFromServer();



  loadFromServer = () => {
    fetch(import.meta.env.VITE_API_URL)
         .then(response => response.json())
         .then(notes => this.setState({ notes }))
         .catch(error => {
             console.error("Ошибка при загрузке данных с сервера:", error);
         });
   };

 

  deleteFromServer = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/${id}`, { method: 'DELETE' })
    .then(() => this.loadFromServer())
  }

  addToServer = (text) => {
    fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body:JSON.stringify(text)
    }).then(() => this.loadFromServer())
  }

  render() {
    return (
      <div className="notes">
        <GetButton onGet={this.loadFromServer} />
        <NotesList notesArray={this.state.notes} onDelete={this.deleteFromServer} />
        <NotesInput onAdd={this.addToServer} />
      </div>
    );
  }
}