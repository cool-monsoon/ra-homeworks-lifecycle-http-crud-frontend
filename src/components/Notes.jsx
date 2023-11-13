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
         .then(response => {
             if (response.headers.get("Content-Type") === "application/json") {
                 return response.text();
             } else {
                 throw new Error("Ожидался JSON-объект, но получен некорректный ответ");
             }
         })
         .then(notes => this.setState({ notes: jsonStr2Obj(notes) }))
         .catch(error => {
             console.error("Ошибка при загрузке данных с сервера:", error);
         });
   };

 jsonStr2Obj = (jsonStr) => {
  try {
     return JSON.parse(jsonStr);
  } catch (error) {
     console.error("Ошибка при преобразовании строки в JSON-объект:", error);
     return null;
  }
 }

  deleteFromServer = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/${id}`, { method: 'DELETE' })
    .then(() => this.loadFromServer())
  }

  addToServer = (text) => {
    fetch('http://localhost:7070/', {
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
        <NotesList item={this.state.notes} onDelete={this.deleteFromServer} />
        <NotesInput onAdd={this.addToServer} />
      </div>
    );
  }
}