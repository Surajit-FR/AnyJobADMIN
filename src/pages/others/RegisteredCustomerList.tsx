import { useCallback, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import $ from "jquery";
import axios from "axios";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import { REACT_APP_BASE_URL } from "../../config/app.config";
import { debounce } from "lodash";
import CustomerDetailsModal from "../../components/core/customerlist/CustomerDetailsModal";
import { AppDispatch } from "../../store/Store";
import { useDispatch } from "react-redux";
import { getUserDetailsRequest } from "../../store/reducers/UserReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Registered Customer List" }
];

const RegisteredCustomerList = (): JSX.Element => {
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
            buttons: ["copy", "csv", "excel", "pdf", "print"],
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

                    const response = await axios.get(`${REACT_APP_BASE_URL}/user/get-registered-customers`, {
                        params,
                        withCredentials: true
                    });

                    // Include the average rating in customerData
                    const customerData = response?.data?.data?.customers.map((item: any) => [
                        `${item.firstName} ${item.lastName}`,
                        item.email,
                        item.userType,
                        new Date(item.createdAt).toLocaleDateString(),
                        item.avgRating || "-- --"
                    ]);

                    const totalRecords = response.data.data.pagination.total;

                    callback({
                        draw: data.draw,
                        recordsTotal: totalRecords,
                        recordsFiltered: totalRecords,
                        data: customerData
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            columns: [
                { title: "Name" },
                { title: "Email" },
                { title: "User Type" },
                { title: "Date Registered" },
                { title: "Avg. Rating" }
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

        // Remove event listener for action button
        return () => {
            searchInput.off('input');
            table.destroy();
        };
    }, [handleActionClick]);

    return (
        <>
            <PageTitle pageName="Registered Customer List" breadcrumbs={breadcrumbs} />

            <CustomerDetailsModal />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>User Type</th>
                                        <th>Date Registered</th>
                                        <th>Avg. Rating</th>
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

export default RegisteredCustomerList;