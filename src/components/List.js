/* eslint-disable */
import React from 'react';
const Lists = (props) => (
	<div className='container'>
		{props.notes.map((note) => (
			<div key={note.id} className='border border-primary rounded p-3 m-3'>
				<span>{note.note}</span>
				<button
					type='button'
					className='close'
					onClick={() => {
						props.deleteNotes(note);
					}}>
					<i className='fas fa-trash-alt' />
				</button>
				<button
					type='button'
					className='close'
					onClick={() => {
						props.editNotes(note);
					}}>
					<i className='fas fa-edit' />
				</button>
			</div>
		))}
	</div>
);

export default Lists;
