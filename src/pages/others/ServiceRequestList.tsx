import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { AppDispatch } from "../../store/Store";
import { useCallback, useEffect } from "react";
import { getUserDetailsRequest } from "../../store/reducers/UserReducers";
import { REACT_APP_BASE_URL } from "../../config/app.config";
import $ from "jquery";
import axios from "axios";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import { debounce } from "lodash";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Request List" }
];

const ServiceRequestList = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const handleActionClick = useCallback((id: string) => {
        dispatch(getUserDetailsRequest({ userId: id }));
    }, [dispatch]);

    useEffect(() => {
        const table = $('#datatable-buttons').DataTable({
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
            select: true,
            dom: '<"top d-flex justify-content-between align-items-center"lBf>rt<"bottom"ip>',
            buttons: [
                {
                    extend: 'csvHtml5',
                    text: 'Export CSV',
                    className: 'btn btn-primary btn-sm'
                }
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

                    const response = await axios.get(`${REACT_APP_BASE_URL}/service`, {
                        params,
                        withCredentials: true
                    });

                    const serviceData = response?.data?.data?.serviceRequests.map((item: any) => [
                        item.userId ? `${item.userId.firstName} ${item.userId.lastName}` : 'N/A',
                        item.requestProgress,
                        item.serviceStartDate ? new Date(item.serviceStartDate).toLocaleDateString() : '--',
                        item.serviceProviderId ? 'Assigned' : 'Unassigned',
                        item.isReqAcceptedByServiceProvider ? 'Accepted' : 'Not Accepted',
                        item.isApproved,
                        `$${item.tipAmount}`,
                        `$${item.incentiveAmount}`,
                    ]);

                    const totalRecords = response.data.data.pagination.total;

                    callback({
                        draw: data.draw,
                        recordsTotal: totalRecords,
                        recordsFiltered: totalRecords,
                        data: serviceData
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            columns: [
                { title: "User Name" },
                { title: "Request Progress" },
                { title: "Service Date" },
                { title: "Service Provider Status" },
                { title: "Acceptance Status" },
                { title: "Approval Status" },
                { title: "Tip Amount" },
                { title: "Incentive Amount" },
            ],
        });

        const debouncedSearch = debounce((value: string) => {
            table.search(value).draw();
        }, 600);

        const searchInput = $('#datatable-buttons_filter input');

        searchInput.on('input', function () {
            const searchValue = $(this).val();
            debouncedSearch(searchValue as string);
        });

        return () => {
            searchInput.off('input');
            table.destroy();
        };
    }, [handleActionClick]);

    return (
        <>
            <PageTitle pageName="Service Request List" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Request Progress</th>
                                        <th>Service Date</th>
                                        <th>Service Provider Status</th>
                                        <th>Acceptance Status</th>
                                        <th>Approval Status</th>
                                        <th>Tip Amount</th>
                                        <th>Incentive Amount</th>
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

export default ServiceRequestList;