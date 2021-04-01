import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Page from '../routes/page';

const aprilFools = () => {
	setTimeout(() => {
		window.location.replace("https://destiny.gg/logout");
	}, 1000);
	return (
	  <img style="height: 100vh; width: 100vw" src="https://i.imgur.com/L82zCGB.jpg"/>
	);
};

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		const now = new Date();
		if (now.getMonth() === 3 && now.getDate() === 1) {
			return aprilFools();
		}

		return (
			<div id="app">
				<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Page path="/:title" />
				</Router>
			</div>
		);
	}
}
