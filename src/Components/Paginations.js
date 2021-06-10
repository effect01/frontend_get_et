import {Link} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export const Paginations = (list, url, paginaActual) => (
	<Pagination id="products-pagination" size="lg" aria-label="Page navigation">
		{paginaActual == 1 ? (
			<PaginationItem disabled={true}>
				<PaginationLink previous />{' '}
			</PaginationItem>
		) : (
			<PaginationItem disabled={false}>
				<Link style={{pointerEvents: 'painted'}} to={url + (+paginaActual - 1)}>
					<PaginationLink previous />
				</Link>{' '}
			</PaginationItem>
		)}

		{list.map((i, index) => (
			<PaginationItem>
				<Link to={url + (index + 1)}>
					<PaginationLink>{i}</PaginationLink>
				</Link>
			</PaginationItem>
		))}
		{list[list.length - 1] != paginaActual ? (
			<PaginationItem disabled={false}>
				<Link style={{pointerEvents: 'painted'}} to={url + (+paginaActual + 1)}>
					<PaginationLink next />
				</Link>
			</PaginationItem>
		) : (
			<PaginationItem disabled={true}>
				<PaginationLink next />
			</PaginationItem>
		)}
	</Pagination>
);
