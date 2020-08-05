const TimeStamp = ({ date }) => {
	const currentTime = new Date().getTime();
	const time = new Date(date).getTime();
	const gap = (currentTime - time) / 1000;
	if (gap < 60) {
		let distance = Math.round(gap);
		return `${distance} saniye önce`;
	} else if (gap < 60 * 60) {
		let distance = Math.round(gap / 60);
		return `${distance} dakika önce`;
	} else if (gap < 24 * 60 * 60) {
		let distance = Math.round(gap / (60 * 60));
		return `${distance} saat önce`;
	} else if (gap < 24 * 60 * 60 * 7) {
		let distance = Math.round(gap / (60 * 60 * 24));
		return `${distance} gün önce`;
	} else if (gap < 24 * 60 * 60 * (365 / 12)) {
		let distance = Math.round(gap / (60 * 60 * 24 * 7));
		return `${distance} hafta önce`;
	} else if (gap < 60 * 60 * 24 * 365) {
		let distance = Math.round(gap / (24 * 60 * 60 * (365 / 12)));
		return `${distance} ay önce`;
	} else {
		let distance = Math.round(gap / (24 * 60 * 60 * 365));
		return `${distance} yıl önce`;
	}
};

export default TimeStamp;
