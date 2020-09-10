import React from 'react';
import Link from 'next/link';

const ActInfo = ({ act }) => {
	if (act._id) {
		return (
			<div
				className="side-card"
				style={{ borderColor: act.background, textAlign: 'center' }}
			>
				<Link
					href="/mevzuat/[actName]/[id]/[page]"
					as={`/mevzuat/${act.name
						.toLocaleLowerCase('tr')
						.replace(/ğ/gim, 'g')
						.replace(/ü/gim, 'u')
						.replace(/ş/gim, 's')
						.replace(/ı/gim, 'i')
						.replace(/ö/gim, 'o')
						.replace(/ç/gim, 'c')
						.replace(/\s/g, '-')
						.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${act._id}/0`}
				>
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
