import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { getRevenueChartOptions } from '../../../utils/chartUtils';
import { Link } from 'react-router-dom';

interface RevenueChartProps {
    colors: string[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ colors }) => {
    // Get the chart options
    const options = getRevenueChartOptions(colors);

    return (
        <>
            <div className="col-lg-8">
                <div className="card" style={{ height: "595px" }}>
                    <div className="d-flex card-header justify-content-between align-items-center">
                        <h4 className="header-title">Revenue</h4>
                        <div className="dropdown">
                            <Link to="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="ri-more-2-fill"></i>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-animated dropdown-menu-end">
                                <Link to="#" className="dropdown-item">Sales Report</Link>
                                <Link to="#" className="dropdown-item">Export Report</Link>
                                <Link to="#" className="dropdown-item">Profit</Link>
                                <Link to="#" className="dropdown-item">Action</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="bg-light-subtle border-top border-bottom border-light">
                            <div className="row text-center">
                                <div className="col">
                                    <p className="text-muted mt-3"><i className="ri-donut-chart-fill"></i> Current Week</p>
                                    <h3 className="fw-normal mb-3">
                                        <span>$1705.54</span>
                                    </h3>
                                </div>
                                <div className="col">
                                    <p className="text-muted mt-3"><i className="ri-donut-chart-fill"></i> Previous Week</p>
                                    <h3 className="fw-normal mb-3">
                                        <span>$6,523.25 <i className="ri-corner-right-up-fill text-success"></i></span>
                                    </h3>
                                </div>
                                <div className="col">
                                    <p className="text-muted mt-3"><i className="ri-donut-chart-fill"></i> Conversion</p>
                                    <h3 className="fw-normal mb-3">
                                        <span>8.27%</span>
                                    </h3>
                                </div>
                                <div className="col">
                                    <p className="text-muted mt-3"><i className="ri-donut-chart-fill"></i> Customers</p>
                                    <h3 className="fw-normal mb-3">
                                        <span>69k <i className="ri-corner-right-down-line text-danger"></i></span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <div dir="ltr">
                            <ReactApexChart
                                options={options}
                                series={options.series}
                                type="line" // or the type you need
                                height={335} // or the height you need
                                className="apex-charts mt-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RevenueChart;