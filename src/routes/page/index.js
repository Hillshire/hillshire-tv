import { h, Component } from 'preact';
import pages from '../home/pages';
import './style.css';

const reduceAudioVolume = () => {
	const audio = document.getElementById('audio');
	if (audio) audio.volume = 0.5;
};

const renderAudio = (page) => (
	<audio id="audio" autoplay controls >
		<source src={page.url} type="audio/mp3" />
		Your browser doesn't support embedded audio. NoTears
	</audio>
);

const renderImgur = (page) => (
	<div id="page-content">
		<img src={`https://i.imgur.com/${page.url}`} />
	</div>
);

const renderOther = (page) => (
	<iframe
		src={page.url}
		frameborder="0"
		allowfullscreen
	/>
);

const renderYoutube = (page) => (
	<iframe
		src={`//www.youtube.com/embed/${page.url}?rel=0&autoplay=1&start=${page.start_time}`}
		frameborder="0"
		allowfullscreen
	/>
);

const renderDan = () => {
	// eslint-disable-next-line no-unused-vars
	const noJapan = true;
	const styles = {
		backgroundImage: 'url(https://puu.sh/ELxO6/f2870c4239.png)',
		backgroundRepeat: 'repeat',
		height: '100vh',
		width: '99vw'
	};
	return (
		<section class="dan" style={styles}>
			<audio id="audio-dan" autoplay loop volume="0.25">
				<source src="https://puu.sh/ELxNs/734c005acb.mp3" type="audio/mp3" />
			</audio>
		</section>);
};

const renderError = () => (
	<div class="alert alert-danger" role="alert">
		<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
		<span class="sr-only">Error:</span>
		Page was not found. How about a <a href="/random">random page instead?</a>
	</div>
);


const renderPage = (page) => {
	if (!page) return renderError();
	const pageType = page.type;
	switch (pageType) {
		case 'audio'  : return renderAudio(page);
		case 'imgur'  : return renderImgur(page);
		case 'other'  : return renderOther(page);
		case 'youtube': return renderYoutube(page);
		case 'dan': return renderDan();
		default: return renderError();
	}
};

/**
 * Forces a page redirect
 */
const randomPage = () => {
	const pageOptions = Object.keys(pages);
	const randomPage = pageOptions[Math.floor(Math.random()*pageOptions.length)];
	const location = window.location.href.split('/');
	location[location.length - 1] = randomPage;
	const redirectUrl = location.join('/');
	window.location.href = redirectUrl;
};

export default class Page extends Component {
	clickedToPlayDansStupidPage() {
		// have to do this because of autoplay permissions on chrome
		this.setState({ clickedToPlay: true });
	}

	constructor() {
		super();
		this.clickedToPlayDansStupidPage = this.clickedToPlayDansStupidPage.bind(this);
	}

	state = {
		clickedToPlay: false
	};

	componentDidMount() {
		reduceAudioVolume();
	}
	render({ title }) {
		if (title.toLowerCase() === 'random') return randomPage();
		const pageTitle = Object.keys(pages).find(key => key.toLowerCase() === title.toLowerCase());
		const page = pages[pageTitle];
		if (title.toLowerCase() === 'dan' && !this.state.clickedToPlay) {
			return <a href="#YEE-WINS" onClick={this.clickedToPlayDansStupidPage} style={{ fontSize: '20px' }}>Click to play</a>;
		}
		return renderPage(page);
	}
}
