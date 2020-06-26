import React from 'react';
import './TextContainer.css';

const TextContainer = ({ users }) => (
	<div className="textContainer">
		{
			users
				? (
				<div>
					<h3>En ligne :</h3>
					<div className="activeContainer">
						<p>
							<h2>
								{users.map(({name}) => (
									<div key={name} className="activeItem">
										<span className="online"/>
										{name}
									</div>
								))}
							</h2>
						</p>
					</div>
				</div>
				)
				: null
		}
		<div className="madeWith">
			<h3>ChatApp en temps réel</h3>
			<p>Avec React, Express, Node, SocketIO ...</p>
		</div>
	</div>
);

export default TextContainer;
