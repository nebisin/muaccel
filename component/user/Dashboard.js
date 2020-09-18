import DashboardSidebar from 'component/user/DashboardSidebar';
import DashboardActs from './DashboardActs';
import DashboardBlogs from './DashboardBlogs';
import DashboardArticles from './DashboardArticles';
import Footer from 'component/Footer';
import ActiveAlert from './ActiveAlert';

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
				<DashboardActs />
				<DashboardArticles />
				<DashboardBlogs />
				<Footer />
			</section>
		</div>
	);
};

export default Dashboard;
