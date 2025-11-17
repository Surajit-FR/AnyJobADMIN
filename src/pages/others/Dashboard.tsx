import { Link } from "react-router-dom";
import {
    // SetStateAction,
    useEffect,
    useState
} from "react";
// import DatePicker from "react-datepicker";
// import cardData from '../../components/core/dashboard/dashboardCardData.json';
import DashboardCardData from "../../components/core/dashboard/DashboardCardData";
import TotalSalesChart from "../../components/core/dashboard/TotalSalesChart";
import RevenueChart from "../../components/core/dashboard/RevenueChart";
import CountryChart from "../../components/core/dashboard/CountryChart";
import TopSellingProducts from "../../components/core/dashboard/TopSellingProducts";
import ChannelsData from "../../components/core/dashboard/ChannelsData";
import SocialMediaTrafficData from "../../components/core/dashboard/SocialMediaTrafficData";
import EngagementOverview from "../../components/core/dashboard/EngagementOverview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { getDashboardCardDataRequest } from "../../store/reducers/DashboardReducer";
import { dashboadCardData } from '../../../types/dashboard'

const Dashboard = (): JSX.Element => {
    // const [startDate, setStartDate] = useState<Date | null>(new Date());
    const { dashboardCardData } = useSelector((state: RootState) => state.dashboardSlice)
    const [cardDataToDisplay, setCarddataToDisplay] = useState<dashboadCardData[]>([])

    const colors = ['#4254ba', '#17a497', '#fa5c7c', '#ffbc00'];
    const dispatch: AppDispatch = useDispatch();
    console.log({ dashboardCardData });

    useEffect(() => {
        dispatch(getDashboardCardDataRequest('DashboardSlice/getDashboardCardDataRequest'))
    }, [dispatch])

    useEffect(() => {
        if (dashboardCardData) {
            setCarddataToDisplay([
                {
                    title: "Customers",
                    value: String(dashboardCardData?.totalCustomer),
                    icon: "ri-group-line",
                    iconBg: "text-bg-success",
                    badge: {
                        text: "view detils",
                        color: "bg-success",
                        icon: "ri-arrow-up-line"
                    },
                    link: '/registered-customer-list',
                    borderColor: "#17a497",
                },
                {
                    title: "Service Providers",
                    value: String(dashboardCardData?.totalServiceProvider),
                    icon: "ri-presentation-fill",
                    iconBg: "text-bg-primary",
                    badge: {
                        text: "view detils",
                        color: "text-bg-primary",
                        icon: "ri-arrow-up-line"
                    },
                    link: '/service-provider-list',
                    borderColor: "#4254ba",
                },
                {
                    title: "Service Requests",
                    value: String(dashboardCardData?.totalGeneratedService),
                    icon: "ri-service-fill",
                    iconBg: "text-bg-info",
                    badge: {
                        text: "view detils",
                        color: "text-bg-info",
                        icon: "ri-arrow-up-line"
                    },
                    link: '/service-request-list',
                    borderColor: '#299bf6'
                },
                {
                    title: "Revenue",
                    value: `$${String(dashboardCardData?.balance.pending / 100)}`,
                    icon: "ri-pulse-line",
                    iconBg: "text-bg-warning",
                    badge: {
                        text: "view detils",
                        color: "text-bg-warning",
                        icon: "ri-arrow-up-line"
                    },
                    link: '/transactions',
                    borderColor: "#fec20d"
                },
                {
                    title: "Available Balance",
                    value: `$${String(dashboardCardData?.balance.avilable / 100)}`,
                    icon: "ri-money-dollar-circle-line",
                    iconBg: "text-bg-danger",
                    badge: {
                        text: "view detils",
                        color: "text-bg-danger",
                        icon: "ri-arrow-up-line"
                    },
                    link: '/transactions',
                    borderColor: "#f7473a"
                },
            ])
        }
    }, [dashboardCardData])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box justify-content-between d-flex align-items-lg-center flex-lg-row flex-column">
                        <h4 className="page-title">Dashboard</h4>
                        <form className="d-flex mb-xxl-0 mb-2">
                            {/* <div className="input-group">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: SetStateAction<Date | null>) => setStartDate(date)}
                                    className="form-control shadow border-0"
                                    id="dash-daterange"
                                />
                                <span className="input-group-text bg-primary border-primary text-white">
                                    <i className="ri-calendar-todo-fill fs-13"></i>
                                </span>
                            </div> */}
                            <Link to="#" className="btn btn-primary ms-2" onClick={() => window.location.reload()}>
                                <i className="ri-refresh-line"></i>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            {/* DashboardCardData Section */}
            {cardDataToDisplay && cardDataToDisplay.length > 0 && (
                <DashboardCardData
                    cardData={cardDataToDisplay}
                />
            )}

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