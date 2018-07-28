import { h } from 'preact';
import pages from './pages';

const pageRows = Object.keys(pages).map(title => {
	const { description } = pages[title];
	return (
		<tr>
			<th scope="row">{title}</th>
			<td><a href={`/${title}`}>hillshire.tv/{title}</a></td>
			<td>{description}</td>
		</tr>
	);
});


const Home = () => (
	<table class="table table-dark">
		<thead>
			<tr>
				<th scope="col">Page</th>
				<th scope="col">Link</th>
				<th scope="col">Description</th>
			</tr>
		</thead>
		<tbody>
			{pageRows}
		</tbody>
	</table>
);

export default Home;
