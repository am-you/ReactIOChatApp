import React from 'react';
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => (
	<form className="form">
		<input
			className="input"
			type="text"
			placeholder="Type a message..."
			value={message}
			onChange={(event) => setMessage(event.target.value)}
			onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
		/>
		<div className="sendButton" onClick={event => sendMessage(event)}>
			<span className="chevron"/>
		</div>
	</form>
)

export default Input;
