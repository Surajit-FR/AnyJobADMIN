import { ApexOptions } from 'apexcharts';

export const getRevenueChartOptions = (colors: string[]): ApexOptions => ({
    series: [
        { name: 'Revenue', type: 'area', data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160] },
        { name: 'Sales', type: 'bar', data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16] }
    ],
    chart: { height: 335, type: 'line', offsetY: 0 },
    stroke: { width: [2, 1] },
    plotOptions: { bar: { columnWidth: '25%' } },
    colors,
    dataLabels: { enabled: true, enabledOnSeries: [1] },
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    xaxis: { type: 'datetime' },
    legend: { offsetY: 7 },
    grid: { padding: { bottom: 5 } },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            inverseColors: true,
            opacityFrom: 0,
            opacityTo: 0.75,
            stops: [0, 0, 0]
        }
    },
    yaxis: [
        { title: { text: 'Net Revenue' } },
        { opposite: true, title: { text: 'Number of Sales' } }
    ]
});

export const getAverageSalesChartOptions = (colors: string[]): ApexOptions => ({
    chart: { height: 367, type: 'radialBar' },
    plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
                name: { fontSize: '14px', offsetY: 100 },
                value: {
                    offsetY: 55,
                    fontSize: '24px',
                    formatter: (value: number | string) => `${Number(value)}%`
                }
            },
            track: { background: 'rgba(170,184,197, 0.2)', margin: 0 }
        }
    },
    fill: {
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.2,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
        }
    },
    stroke: { dashArray: 4 },
    colors,
    series: [67],
    labels: ['Returning Customer'],
    responsive: [{ breakpoint: 380, options: { chart: { height: 180 } } }],
    grid: { padding: { top: 0, right: 0, bottom: 0, left: 0 } }
});

export const getCountryChartOptions = (colors: string[]): ApexOptions => ({
    chart: { height: 320, type: 'bar' },
    plotOptions: { bar: { horizontal: true } },
    colors,
    dataLabels: { enabled: false },
    series: [{ name: 'Orders', data: [90, 75, 60, 50, 45, 36, 28, 20, 15, 12] }],
    xaxis: {
        categories: ['India', 'China', 'United States', 'Japan', 'France', 'Italy', 'Netherlands', 'United Kingdom', 'Canada', 'South Korea'],
        axisBorder: { show: false },
        labels: { formatter: (value: string) => `${value}%` }
    },
    grid: { strokeDashArray: 5 }
});