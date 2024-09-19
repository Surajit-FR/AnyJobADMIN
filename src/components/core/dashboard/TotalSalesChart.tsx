import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { getAverageSalesChartOptions } from '../../../utils/chartUtils';
import { Link } from 'react-router-dom';

interface TotalSalesChartProps {
    colors: string[];
}

const TotalSalesChart: React.FC<TotalSalesChartProps> = ({ colors }) => {
    const options = getAverageSalesChartOptions(colors);

    return (
        <>
            <div className="col-lg-4">
                <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                        <h4 className="header-title">Total Sales</h4>
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

                    <div className="card-body">
                        <ReactApexChart
                            options={options}
                            series={options.series}
                            type="radialBar"
                            height={367}
                        />
                        {/* Replace chartRef with ReactApexChart */}
                        <h5 className="mb-1 mt-0 fw-normal">Brooklyn, New York</h5>
                        <div className="progress-w-percent">
                            <span className="progress-value fw-bold">72k </span>
                            <div className="progress progress-sm">
                                <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>

                        <h5 className="mb-1 mt-0 fw-normal">The Castro, San Francisco</h5>
                        <div className="progress-w-percent">
                            <span className="progress-value fw-bold">39k </span>
                            <div className="progress progress-sm">
                                <div className="progress-bar" role="progressbar" style={{ width: "39%" }} aria-valuenow={39} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>

                        <h5 className="mb-1 mt-0 fw-normal">Kovan, Singapore</h5>
                        <div className="progress-w-percent mb-0">
                            <span className="progress-value fw-bold">61k </span>
                            <div className="progress progress-sm">
                                <div className="progress-bar" role="progressbar" style={{ width: "61%" }} aria-valuenow={61} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TotalSalesChart;