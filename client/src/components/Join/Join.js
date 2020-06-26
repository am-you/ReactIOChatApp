import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import './Join.css';

export default function SignIn() {

	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<img src={ logo } alt="logo" width="75" height="75" className="logo"/>
				<h1 className="heading">Chat</h1>
				<div>
					<div>
						<input placeholder="Pseudo" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
					</div>
					<div>
						<input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
					</div>
				</div>
				<div className="button-container">
					<Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
						<button className="button" type="submit">Enter</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
