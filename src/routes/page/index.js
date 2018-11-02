import { h, Component } from 'preact';
import style from './style';
import pages from '../home/pages';

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
		case 'default': return renderError();
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
	componentDidMount() {
		reduceAudioVolume();
	}
	render({ title }) {
		if (title.toLowerCase() === 'random') return randomPage();
		const pageTitle = Object.keys(pages).find(key => key.toLowerCase() === title.toLowerCase());
		const page = pages[pageTitle];
		return (
			renderPage(page)
		);
	}
}
