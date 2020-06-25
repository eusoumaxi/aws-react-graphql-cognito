/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listNotes, searchNotes } from './graphql/queries';
import { createNote, deleteNote, updateNote } from './graphql/mutations';

import awsExports from './aws-exports';
import Lists from './components/List';
import SearchNote from './components/SearchNote';
import AddNote from './components/AddNote';
import '@aws-amplify/ui/dist/style.css';

Amplify.configure(awsExports);

const App = () => {
  const [notes, setNote] = useState({ notes: [] });
  useEffect(() => {
    API.graphql(graphqlOperation(listNotes))
      .then((res) => setNote({ notes: res.data.listNotes.items }))
      .catch((err) => console.error(err));
  }, []);
  const addNote = (note) => {
    API.graphql(graphqlOperation(createNote, { input: note }))
      .then((res) => setNote({ notes: [...notes.notes, res.data.createNote] }))
      .catch((err) => console.error(err));
  };
  const deleteNotes = async (note) => {
    const id = {
      id: note.id,
    };
    await API.graphql(graphqlOperation(deleteNote, { input: id }));
    setNote({
      notes: notes.notes.filter((value, _index, _arr) => value.id !== note.id),
    });
    console.log(notes);
  };
  const editNotes = async (note) => {
    const edit = prompt('Edit: ', `${note.note}`);
    const id = {
      id: note.id,
      note: edit,
    };

    API.graphql(graphqlOperation(updateNote, { input: id })).then((res) => setNote({
      notes: [
        res.data.updateNote,
        ...notes.notes.filter((value, _index, _arr) => value.id !== note.id),
      ],
    }));
  };
  const searchNote = async (note) => {
    let result;
    if (note.note === '') {
      result = await API.graphql(graphqlOperation(listNotes));
      setNote({ notes: result.data.listNotes.items });
    } else {
      const filter = {
        note: {
          match: note,
        },
      };
      result = await API.graphql(
        graphqlOperation(searchNotes, { filter }),
      );
      if (result.data.searchNotes.items.length > 0) {
        setNote({ notes: result.data.searchNotes.items });
      } else {
        // no search result, print help
        setNote({
          notes: [
            {
              id: '-1',
              note: 'No Match: Clear the search to go back to your Notes',
            },
          ],
        });
      }
    }
  };

  return (
    <div>
      <div className="container p-3">
        <AddNote addNote={addNote} />
        <SearchNote searchNote={searchNote} />
      </div>
      <Lists
        notes={notes.notes}
        deleteNotes={deleteNotes}
        editNotes={editNotes}
      />
    </div>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
