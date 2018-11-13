import React, { Component } from "react";
import Highlight from 'react-highlight'
import '../../node_modules/highlight.js/styles/monokai-sublime.css';
import axios from "axios";

export default class AsyncDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            funcs: [],
            character: null
        };

        this.myAsyncFunction = this.myAsyncFunction.bind(this);
    }

    async myAsyncFunction() {
        this.setState({
            result: "",
            character: null,
            funcs: [
                `await axios.get("https://swapi.co/api/people/2");`
            ]
        });
        const firstResult = await axios.get("https://swapi.co/api/people/2");
        this.setState({
            result: firstResult.data.name,
            funcs: [
                ...this.state.funcs,
                `await axios.get(firstResult.data.homeworld)`
            ]
        });
        const secondResult = await axios.get(firstResult.data.homeworld);
        this.setState({
            result: secondResult.data.name,
            funcs: [
                ...this.state.funcs,
                `await axios.get(secondResult.data.films[0])`
            ]
        });

        console.log(secondResult.data.films[0])
        const thirdResult = await axios.get(secondResult.data.films[0]);


        this.setState({
            result: thirdResult.data.title,
            funcs: [...this.state.funcs, ``],
            character: {
                name: firstResult.data.name,
                height: firstResult.data.height,
                mass: firstResult.data.mass,
                homeworld: secondResult.data.name,
                movieTheHomeWorldIsIn: thirdResult.data.title
            }
        });
    }

    render() {
        const whatsBeingCalled = this.state.funcs.map((func, index) => {
            return (
                <div className='whats-called-container'>
                    {this.state.funcs.length - 1 === index && func !== "" ? (
                        <div className="calling-container">
                            <span className="calling">calling</span>
                            <Highlight className='javascript'>{func}</Highlight>
                        </div>
                    ) : (
                            <div className="calling-container">
                                {func !== "" ? (
                                    <>
                                        <span className="called">called</span>
                                        <Highlight className='javascript'>{func}</Highlight>
                                    </>
                                ) : (
                                        ""
                                    )}

                            </div>
                        )}
                </div>
            );
        });



        return (
            <div className="async-demo">
                <div className="left-side">
                    <h1>Main Function Being Called</h1>
                    <Highlight className='javascript'>{
                        `
async myAsyncFunction() {
  const firstResult = await axios.get("https://swapi.co/api/people/1");
  const secondResult = await axios.get(firstResult.data.homeworld);
  const thirdResult = await axios.get(secondResult.data.films[0]);
}
						`
                    }</Highlight>
                </div>

                <div className="results-container">
                    <div>{this.state.character ? <div>
                        <div><span>Name: </span>{this.state.character.name}</div>
                        <div><span>height: </span>{this.state.character.height} mm</div>
                        <div><span>mass: </span>{this.state.character.mass} kg</div>
                        <div><span>homeworld: </span>{this.state.character.homeworld}</div>
                        <div><span>movieTheHomeWorldIsIn: </span>{this.state.character.movieTheHomeWorldIsIn}</div>
                    </div> : this.state.result}</div>
                    <button
                        onClick={() => {
                            this.myAsyncFunction();
                        }}>
                        Start
					</button>
                </div>

                <div className="right-side">
                    <div>{whatsBeingCalled.reverse()}</div>
                </div>
            </div>
        );
    }
}
