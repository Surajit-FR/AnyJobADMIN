import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getCountryChartOptions } from '../../../utils/chartUtils';
import { Link } from 'react-router-dom';


const CountryChart: React.FC = () => {
    const options = getCountryChartOptions(['#17a497']);

    useEffect(() => {
        const initMap = () => {
            const mapElement = document.getElementById('world-map-markers');
            if (mapElement) {
                (window as any).jQuery(mapElement).vectorMap({
                    map: 'world_mill_en',
                    normalizeFunction: 'polynomial',
                    hoverOpacity: 0.7,
                    hoverColor: false,
                    regionStyle: {
                        initial: {
                            fill: 'rgba(145,166,189,.25)'
                        }
                    },
                    markerStyle: {
                        initial: {
                            r: 9,
                            fill: '#4254ba',
                            'fill-opacity': 0.9,
                            stroke: '#fff',
                            'stroke-width': 7,
                            'stroke-opacity': 0.4
                        },
                        hover: {
                            stroke: '#fff',
                            'fill-opacity': 1,
                            'stroke-width': 1.5
                        }
                    },
                    backgroundColor: 'transparent',
                    markers: [
                        { latLng: [41.9, 12.45], name: 'Vatican City' },
                        { latLng: [43.73, 7.41], name: 'Monaco' },
                        { latLng: [-0.52, 166.93], name: 'Nauru' },
                        { latLng: [-8.51, 179.21], name: 'Tuvalu' },
                        { latLng: [43.93, 12.46], name: 'San Marino' },
                        { latLng: [47.14, 9.52], name: 'Liechtenstein' },
                        { latLng: [7.11, 171.06], name: 'Marshall Islands' },
                        { latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis' },
                        { latLng: [3.2, 73.22], name: 'Maldives' },
                        { latLng: [35.88, 14.5], name: 'Malta' },
                        { latLng: [12.05, -61.75], name: 'Grenada' },
                        { latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines' },
                        { latLng: [13.16, -59.55], name: 'Barbados' },
                        { latLng: [17.11, -61.85], name: 'Antigua and Barbuda' },
                        { latLng: [-4.61, 55.45], name: 'Seychelles' },
                        { latLng: [7.35, 134.46], name: 'Palau' },
                        { latLng: [42.5, 1.51], name: 'Andorra' },
                        { latLng: [14.01, -60.98], name: 'Saint Lucia' },
                        { latLng: [6.91, 158.18], name: 'Federated States of Micronesia' },
                        { latLng: [1.3, 103.8], name: 'Singapore' },
                        { latLng: [0.33, 6.73], name: 'São Tomé and Príncipe' }
                    ]
                });
            }
        };

        initMap();
    }, []);

    return (
        <div className="col-xl-7">
            <div className="card">
                <div className="d-flex card-header justify-content-between align-items-center">
                    <h4 className="header-title">Revenue By Locations</h4>
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
                    <div className="row">
                        <div className="col-lg-8">
                            <div id="world-map-markers" className="mt-3 mb-3" style={{ height: '317px' }}></div>
                        </div>
                        <div className="col-lg-4" dir="ltr">
                            <ReactApexChart
                                options={options}
                                series={options.series}
                                type="bar"
                                height={320}
                                className="apex-charts"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryChart;