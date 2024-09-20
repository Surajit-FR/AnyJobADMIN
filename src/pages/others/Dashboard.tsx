import { Link } from "react-router-dom";
import { SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import cardData from '../../components/core/dashboard/dashboardCardData.json';
import DashboardCardData from "../../components/core/dashboard/DashboardCardData";
import TotalSalesChart from "../../components/core/dashboard/TotalSalesChart";
import RevenueChart from "../../components/core/dashboard/RevenueChart";
import CountryChart from "../../components/core/dashboard/CountryChart";
import TopSellingProducts from "../../components/core/dashboard/TopSellingProducts";
import ChannelsData from "../../components/core/dashboard/ChannelsData";
import SocialMediaTrafficData from "../../components/core/dashboard/SocialMediaTrafficData";
import EngagementOverview from "../../components/core/dashboard/EngagementOverview";

const Dashboard = (): JSX.Element => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const colors = ['#4254ba', '#17a497', '#fa5c7c', '#ffbc00'];

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box justify-content-between d-flex align-items-lg-center flex-lg-row flex-column">
                        <h4 className="page-title">Dashboard</h4>
                        <form className="d-flex mb-xxl-0 mb-2">
                            <div className="input-group">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: SetStateAction<Date | null>) => setStartDate(date)}
                                    className="form-control shadow border-0"
                                    id="dash-daterange"
                                />
                                <span className="input-group-text bg-primary border-primary text-white">
                                    <i className="ri-calendar-todo-fill fs-13"></i>
                                </span>
                            </div>
                            <Link to="#" className="btn btn-primary ms-2" onClick={() => window.location.reload()}>
                                <i className="ri-refresh-line"></i>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            {/* DashboardCardData Section */}
            <DashboardCardData
                cardData={cardData}
            />

            <div className="row">
                {/* TotalSalesChart Section */}
                <TotalSalesChart colors={colors} />

                {/* RevenueChart Section */}
                <RevenueChart colors={colors} />
            </div>

            <div className="row">
                {/* CountryChart Section */}
                <CountryChart />

                {/* TopSellingProducts Section */}
                <TopSellingProducts />
            </div>

            <div className="row">
                {/* ChannelsData Section */}
                <ChannelsData />

                {/* SocialMediaTrafficData Section */}
                <SocialMediaTrafficData />

                {/* EngagementOverview Section */}
                <EngagementOverview />
            </div>
        </>
    );
}

export default Dashboard;