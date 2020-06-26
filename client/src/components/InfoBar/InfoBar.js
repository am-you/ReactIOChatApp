import React from 'react';
import './InfoBar.css';

const InfoBar = ({ room }) => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<span className="online"/>
			<h3>Room {room}</h3>
		</div>
		<div className="rightInnerContainer">
			<a href="/">Quitter</a>
		</div>
	</div>
);

export default InfoBar;
