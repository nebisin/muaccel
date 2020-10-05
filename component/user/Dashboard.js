import DashboardSidebar from 'component/user/DashboardSidebar';
import DashboardActs from './DashboardActs';
import DashboardBlogs from './DashboardBlogs';
import DashboardArticles from './DashboardArticles';
import Footer from 'component/Footer';
import ActiveAlert from './ActiveAlert';
import CreateStatus from './CreateStatus';
import StatusItem from './StatusItem';

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<aside className="dashboard-sidebar">
				<div className="dashboard-sidebar-in">
					<DashboardSidebar page="home" />
				</div>
			</aside>
			<section className="dashboard-main">
				<ActiveAlert />
				<CreateStatus />
				<DashboardActs />
				<StatusItem />
				<DashboardArticles />
				<DashboardBlogs />
				<Footer />
			</section>
		</div>
	);
};

export default Dashboard;
