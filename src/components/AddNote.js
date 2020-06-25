/* eslint-disable */
import React, { useState } from 'react';

const AddNote = (props) => {
	const [note, setNote] = useState([]);

	const handleChange = (event) => {
		setNote({ note: event.target.value });
	};
	const handleClick = (event) => {
		note.note.length <= 1 && alert(' check the entered field');
		event.preventDefault();
		props.addNote(note.note.length > 1 && note);
		setNote({ note: '' });
	};
	return (
		<div className='input-group mb-3 p-3'>
			<input
				type='text'
				className='form-control form-control-lg'
				placeholder='New Note'
				aria-label='Note'
				aria-describedby='basic-addon2'
				onChange={handleChange}
				required
			/>
			<div className='input-group-append'>
				<button onClick={handleClick} className='btn btn-primary' type='submit'>
					{'Add Note'}
				</button>
			</div>
		</div>
	);
};

export default AddNote;
