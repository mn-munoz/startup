import React from 'react';

export function Card(props) {

    return (
        <div className="card">
            <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back">
                    <div className="card-body">
                        <h2 className="char-name">{props.charName}</h2>
                        <p>{props.birthday}</p>
                        <h3>Like</h3>
                        <ul className="likes">
                            <li>{props.likeOne}</li>
                            <li>{props.likeTwo}</li>
                            <li>{props.likeThree}</li>
                        </ul>
                        <h3>Dislikes</h3>
                        <ul className="dislikes">
                            <li>{props.dislikeOne}</li>
                            <li>{props.dislikeTwo}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}