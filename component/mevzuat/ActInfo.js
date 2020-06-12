import React from 'react';
import Link from 'next/link';

const ActInfo = ({ act }) => {
	if (act._id) {
		return (
			<div
				className="side-card"
				style={{ borderColor: act.background, textAlign: 'center' }}
			>
				<Link href="/mevzuat/kanun/[id]/[page]" as={`/mevzuat/kanun/${act._id}/0`}>
					<a>
						<div className="side-card-content">
							<p>{act.title} sayılı</p>
							<p>{act.name}</p>
						</div>
					</a>
				</Link>
			</div>
		);
	}
	return <div className="loader" />;
};

export default ActInfo;
