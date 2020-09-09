import DashboardSidebar from 'component/user/DashboardSidebar';
import DashboardActs from './DashboardActs';
import DashboardBlogs from './DashboardBlogs';
import DashboardArticles from './DashboardArticles';

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<aside className="dashboard-sidebar">
				<div className="dashboard-sidebar-in">
					<DashboardSidebar page="home" />
				</div>
			</aside>
			<section className="dashboard-main">
				<DashboardActs />
				<DashboardArticles />
				<DashboardBlogs />
				<div className="dashobard-article"></div>
			</section>
		</div>
	);
};

export default Dashboard;
