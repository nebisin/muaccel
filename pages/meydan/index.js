import Footer from 'component/Footer';

const MeydanPage = () => {
	return (
		<div className="meydan-container">
			<div className="meydan-title">
				<h1 className="hero-title animation-fadeinup">Hazırlanıyor</h1>
				<h3 className="hero-subtitle animation-fadeinup">Muaccel Meydan çok yakında sizlerle</h3>
				<p className="meydan-desc animation-fadeinup">
					Hukuki bir tartışma başlatın veya tartışmaya katkıda bulunun. Çünkü
					düşünceler tartışma ortamında doğar ve gelişir.
				</p>
			</div>
			<div className="meydan-svg-container">
				<div className="meydan-svg fade-in">
					<img
						className="meydan-svg-inline"
						src="/undraw_under_construction_46pa.svg"
						alt="example"
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MeydanPage;
