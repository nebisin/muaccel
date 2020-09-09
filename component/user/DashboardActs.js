import { useState, useEffect } from 'react';
import mevzuatApi from 'api/mevzuat';
import ActList from 'component/mevzuat/ActList';

const DashboardActs = () => {
	const [actList, setActList] = useState();

	useEffect(() => {
		const getActs = async () => {
			const response = await mevzuatApi.post(`/acts`, {
				limit: 3,
				sort: { hit: -1 },
			});
			setActList(response.data);
		};

		getActs();
	}, []);

	return (
		<div className="dashboard-acts">
			<h2 className="title">Önerilen Kanunlar</h2>
			{actList ? (
				<ActList items={actList} />
			) : (
				<div className="card-deck">
					<div className="card-deck-item">
						<p className="card-deck-text"></p>
					</div>
					<div className="card-deck-item">
						<p className="card-deck-text"></p>
					</div>
					<div className="card-deck-item">
						<p className="card-deck-text"></p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardActs;
