import React, { Component } from 'react';
import './People.css';

class People extends Component {

    render() {
        let {
            id,
            name,
            gender,
            age,
            eye_color,
            hair_color,
        } = this.props.data;
        return (
            <li className={"people " + id}>
                <h1>{name}</h1>
                <p>{gender}</p>
                <p>{age}</p>
                <p>{eye_color}</p>
                <p>{hair_color}</p>
            </li>
        );
    }
}

export default People;
