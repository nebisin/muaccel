import { useState, useEffect, useContext } from 'react';
import ActContext from 'context/ActContext';

import SearchBar from 'component/mevzuat/SearchBar';
import ActList from 'component/mevzuat/ActList';
import Sidebar from 'component/mevzuat/Sidebar';

const AllActs = () => {
	const [actList, setActList] = useState([]);

	const { getActList } = useContext(ActContext);

	const filterResultsByCategory = (category) => {
		return actList.filter((item) => {
			return item.category === category;
		});
	};

	useEffect(() => {
		setActList([]);
		const getAll = async () => {
			const result = await getActList({});
			setActList(result);
		};

		getAll();
	}, [getActList]);

	return (
		<div className="flex-container">
			<Sidebar type="home" />
			<section id="showcase">
				<SearchBar />
				{actList.length === 0 ? (
					<div style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}>
						<div className="loader">Loading...</div>
					</div>
				) : (
					<React.Fragment>
						<h4 className="title">Medenî Usul ve İcra-İflas Hukuku</h4>
						<ActList items={filterResultsByCategory(0)} />
						<h4 className="title">İş ve Sosyal Güvenlik Hukuku</h4>
						<ActList items={filterResultsByCategory(1)} />
						<h4 className="title">Medeni Hukuk</h4>
						<ActList items={filterResultsByCategory(2)} />
						<h4 className="title">Ceza ve Ceza Muhakemesi Hukuku</h4>
						<ActList items={filterResultsByCategory(3)} />
						<h4 className="title">Milletlerarası Özel Hukuk ve Usul Hukuku</h4>
						<ActList items={filterResultsByCategory(4)} />
					</React.Fragment>
				)}
			</section>
		</div>
	);
};

export default AllActs;
