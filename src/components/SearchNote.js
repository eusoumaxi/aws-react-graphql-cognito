/* eslint-disable */
import React, { useState } from 'react';

const SearchNote = (props) => {
	const [notes, setNote] = useState({ note: '' });
	const handleChange = (event) => {
		setNote({ note: event.target.value });
	};
	const handleClick = (event) => {
		event.preventDefault();
		props.searchNote(notes);
	};
	return (
		<div className='input-group mb-3 p-3'>
			<div className='input-group-prepend'>
				<button onClick={handleClick} className='btn btn-primary' type='submit'>
					Search
				</button>
			</div>
			<input
				type='text'
				className='form-control form-control-lg'
				placeholder='Search for Notes'
				aria-label='Note'
				aria-describedby='basic-addon2'
				onChange={handleChange}
			/>
		</div>
	);
};

export default SearchNote;
