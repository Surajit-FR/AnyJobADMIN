import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import $ from "jquery";
import axios from "axios";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import { REACT_APP_BASE_URL } from "../../config/app.config";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { getAllServiceProviderRequest } from "../../store/reducers/ServiceReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Provider List" }
];
const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Company", key: "company" },
    { label: "Date Registered", key: "dateRegestered" },
    { label: "Verification", key: "isVerified" },
    { label: "Avg. Rating", key: "avgRatings" },
];

const ServiceProviderList = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { allServiceProviderData } = useSelector((state: RootState) => state.serviceSlice)
    useEffect(() => {
        dispatch(getAllServiceProviderRequest({
            params: {
                page: 1,
                limit: 10000,
                query: '',
                sortBy: '',
                sortType: 'asc',
            }
        }))
    }, [dispatch])

    const dataToExpoer = (data: any) => {
        return data.map((item: any) => (
            {
                name: `${item?.firstName} ${item?.lastName}`,
                email: item?.email || '-- --',
                phone: item?.phone || '-- --',
                company: item?.additionalInfo?.[0]?.companyName || '-- --',
                dateRegestered: new Date(item?.createdAt).toLocaleDateString() || '-- --',
                isVerified: item?.isVerified ? "Verified" : "Unverified",
                avgRatings: item?.avgRating ? item?.avgRating.toFixed(1) : '-- --',
                fieldAgents: item?.fieldAgents?.length > 0 ? item?.fieldAgents?.length : '-- --',
            }
        ))
    }

    useEffect(() => {
        const table = $('#datatable-buttons').DataTable({
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
            select: true,
            dom: '<"top d-flex justify-content-between align-items-center"lBf>rt<"bottom"ip>',
            buttons: [
                // {
                //     extend: 'csvHtml5',
                //     text: 'Export CSV',
                //     className: 'btn btn-primary btn-sm'
                // }
            ],
            serverSide: true,
            processing: true,
            ajax: async (data: any, callback: Function) => {
                try {
                    const params = {
                        page: data.start / data.length + 1,
                        limit: data.length,
                        query: data.search.value || '',
                        sortBy: data.columns[data.order[0].column].data,
                        sortType: data.order[0].dir
                    };

                    const response = await axios.get(`${REACT_APP_BASE_URL}/user/get-service-providers`, {
                        params,
                        withCredentials: true
                    });

                    const serviceProviderData = response.data.data.serviceProviders.map((item: any) => [
                        `${item?.firstName} ${item?.lastName}`,
                        item?.email || '-- --',
                        item?.phone || '-- --',
                        item?.additionalInfo?.[0]?.companyName || '-- --',
                        new Date(item?.createdAt).toLocaleDateString() || '-- --',
                        item?.isVerified ? "Verified" : "Unverified",
                        item?.avgRating ? item?.avgRating.toFixed(1) : '-- --',
                        item?.fieldAgents?.length > 0 ? item?.fieldAgents?.length : '-- --',
                        item?._id
                    ]);

                    const totalRecords = response.data.data.pagination.total;

                    callback({
                        draw: data.draw,
                        recordsTotal: totalRecords,
                        recordsFiltered: totalRecords,
                        data: serviceProviderData
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            columns: [
                { title: "Name" },
                { title: "Email" },
                { title: "Phone" },
                { title: "Company" },
                { title: "Date Registered" },
                {
                    title: "Verification",
                    render: (data: any, type: any, row: any) => {
                        const isVerified = row[5] === "Verified";
                        return `<strong class="${isVerified ? 'text-success' : 'text-danger'}">${row[5]}</strong>`;
                    }
                },
                { title: "Avg. rating" },
                {
                    title: "Field Agents",
                    render: (data: any, type: any, row: any) => {
                        return row[7];
                    }
                },
                {
                    title: "Action",
                    render: (data: any, type: any, row: any) => {
                        return `
                            <a href="#" class="btn btn-primary btn-sm action-button" data-id="${row[8]}">
                                View Details
                            </a>
                        `;
                    }
                }
            ],
        });

        const debouncedSearch = debounce((value: string) => {
            table.search(value).draw();
        }, 600);

        const searchInput = $('#datatable-buttons_filter input');

        searchInput.off('input');
        searchInput.on('input', function () {
            const searchValue = $(this).val();
            if (searchValue !== null) {
                debouncedSearch(searchValue as string);
            }
        });

        $('#datatable-buttons tbody').on('click', '.action-button', function (event) {
            event.preventDefault();
            const id = $(this).data('id');
            navigate(`/service-provider-details/${id}`);
        });

        // Clean up the search input event listener and DataTable on unmount
        return () => {
            searchInput.off('input');
            $('#datatable-buttons tbody').off('click', '.action-button');
            table.destroy();
        };
    }, [navigate]);

    return (
        <>
            <PageTitle pageName="Service Provider List" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-sm-end mb-2 ">
                                <CSVLink
                                    data={dataToExpoer(allServiceProviderData)}
                                    headers={headers}
                                    filename={"service-provider-list.csv"}>
                                    <button className="btn btn-primary btn-md view-details">Download CSV</button>
                                </CSVLink>
                            </div>
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Company</th>
                                        <th>Date Registered</th>
                                        <th>Verification</th>
                                        <th>Avg. rating</th>
                                        <th>Field Agents</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceProviderList;