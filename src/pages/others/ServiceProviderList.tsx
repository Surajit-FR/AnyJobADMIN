import { useCallback, useEffect } from "react";
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
import { showToast } from "../../utils/Toast";
import ServiceProviderDetailsModal from "../../components/core/serviceproviderlist/ServiceProviderDetailsModal";
import { AppDispatch } from "../../store/Store";
import { useDispatch } from "react-redux";
import { getUserDetailsRequest } from "../../store/reducers/UserReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Provider List" }
];

const ServiceProviderList = (): JSX.Element => {
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

                    const response = await axios.get(`${REACT_APP_BASE_URL}/user/get-service-providers`, {
                        params,
                        withCredentials: true
                    });

                    const serviceProviderData = response.data.data.serviceProviders.map((item: any) => [
                        `${item.firstName} ${item.lastName}`,
                        item.email || 'N/A',
                        item.phone || 'N/A',
                        item.additionalInfo?.[0]?.companyName || 'N/A',
                        item.userType || 'N/A',
                        new Date(item.createdAt).toLocaleDateString() || 'N/A',
                        item.isVerified ? "Verified" : "Unverified",
                        item._id
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
                { title: "User Type" },
                { title: "Date Registered" },
                {
                    title: "Verification",
                    render: (data: any, type: any, row: any) => {
                        const isVerified = row[6] === "Verified";
                        return `
                            <button class="btn btn-sm ${isVerified ? 'btn-success' : 'btn-danger'} toggle-verification" data-id="${row[7]}" data-verified="${isVerified}">
                                ${isVerified ? 'Verified' : 'Unverified'}
                            </button>
                        `;
                    }
                },
                {
                    title: "Action",
                    render: (data: any, type: any, row: any) => {
                        return `
                            <button data-bs-toggle="modal" data-bs-target="#serviceproviderdetailsmodal" class="btn btn-primary btn-sm action-button" data-id="${row[7]}">
                                View Details
                            </button>
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

        $('#datatable-buttons').on('click', '.toggle-verification', async function () {
            const button = $(this);
            const userId = button.data("id");
            const isVerified = button.data("verified");

            try {
                const resp = await axios.patch(`${REACT_APP_BASE_URL}/user/verify/${userId}`, {
                    isVerified: !isVerified
                }, { withCredentials: true });
                showToast({ message: resp?.data?.message, type: 'success', durationTime: 3500, position: "top-center" });

                button.toggleClass('btn-success btn-danger').text(isVerified ? 'Unverified' : 'Verified');
                button.data("verified", !isVerified);
            } catch (error) {
                console.error('Error toggling verification:', error);
            }
        });

        $('#datatable-buttons tbody').on('click', '.action-button', function () {
            const id = $(this).data('id');
            handleActionClick(id);
        });

        // Clean up the search input event listener and DataTable on unmount
        return () => {
            searchInput.off('input');
            $('#datatable-buttons tbody').off('click', '.action-button');
            table.destroy();
        };
    }, [handleActionClick]);

    return (
        <>
            <PageTitle pageName="Service Provider List" breadcrumbs={breadcrumbs} />

            <ServiceProviderDetailsModal />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Company</th>
                                        <th>User Type</th>
                                        <th>Date Registered</th>
                                        <th>Verification</th>
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