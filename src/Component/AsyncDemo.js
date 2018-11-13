import React, { Component } from "react";
import Highlight from 'react-highlight'
import '../../node_modules/highlight.js/styles/monokai-sublime.css';

export default class AsyncDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: null,
			funcs: [],
		};

		this.resolveAfter1Seconds = this.resolveAfter1Seconds.bind(this);
		this.resolveAfter2Seconds = this.resolveAfter2Seconds.bind(this);
		this.resolveAfter3Seconds = this.resolveAfter3Seconds.bind(this);
		this.myAsyncFunction = this.myAsyncFunction.bind(this);
	}

	resolveAfter1Seconds() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("resolved fast");
			}, 1000);
		});
	}

	resolveAfter2Seconds() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("resolved medium");
			}, 2000);
		});
	}

	resolveAfter3Seconds() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("resolved slow");
			}, 3000);
		});
	}

	async myAsyncFunction() {
		this.setState({
			result: "",
			funcs: [
				`resolveAfter3Seconds() {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("slow");
                    }, 3000);
                });
            }`
			]
		});
		const slowResult = await this.resolveAfter3Seconds();
		this.setState({
			result: slowResult,
			funcs: [
				...this.state.funcs,
				`resolveAfter2Seconds() {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("medium");
                    }, 2000);
                });
            }`
			]
		});
		const mediumResult = await this.resolveAfter2Seconds();
		this.setState({
			result: mediumResult,
			funcs: [
				...this.state.funcs,
				`resolveAfter1Seconds() {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("fast");
                    }, 1000);
                });
            }`
			]
		});
		const fastResult = await this.resolveAfter1Seconds();
		this.setState({
			result: fastResult,
			funcs: [...this.state.funcs, ``]
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
  const slowResult = await resolveAfter3Seconds();
  const mediumResult = await resolveAfter2Seconds();
  const fastResult = await resolveAfter1Seconds();
}
						`
					}</Highlight>
				</div>

				<div className="results-container">
					<div>{this.state.result}</div>
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
