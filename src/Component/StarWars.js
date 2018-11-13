import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            character: '',
            homeworld: ''
        }

        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
    }
    async getData() {
        const character = await axios.get("https://swapi.co/api/people/1");
        const homeworld = await axios.get(character.data.homeworld);

        this.setState({
            name: character.data.name,
            homeworld: homeworld.data.name
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
                <h1>{this.state.homeworld}</h1>
            </div>
        );
    }
}