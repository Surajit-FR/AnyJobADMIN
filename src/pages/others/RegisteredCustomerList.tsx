import { useEffect, useCallback } from "react";
import PageTitle from "../../components/PageTitle";
import $ from "jquery";
import axios from "axios";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import { REACT_APP_BASE_URL } from "../../config/app.config";

// Debounce function
const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Registered Customer List" }
];

const RegisteredCustomerList = (): JSX.Element => {
    const handleActionClick = useCallback((id: string) => {
        alert(`Button clicked for user with ID: ${id}`);
    }, []);

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

                    const customerData = response?.data?.data?.customers.map((item: any) => [
                        `${item.firstName} ${item.lastName}`,
                        item.email,
                        item.userType,
                        new Date(item.createdAt).toLocaleDateString(),
                        item._id
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
                {
                    title: "Action",
                    render: (data: any, type: any, row: any) => {
                        return `
                            <button class="btn btn-primary btn-sm action-button" data-id="${row[4]}">
                                View Details
                            </button>
                        `;
                    }
                }
            ],
        });

        // Debounced search function
        const debouncedSearch = debounce((value: string) => {
            table.search(value).draw();
        }, 600); // 600ms delay

        // Attach search input event handler
        const searchInput = $('#datatable-buttons_filter input');

        searchInput.on('input', function () {
            const searchValue = $(this).val();
            debouncedSearch(searchValue);
        });

        // Event delegation for dynamic elements (action buttons)
        $('#datatable-buttons tbody').on('click', '.action-button', function () {
            const id = $(this).data('id');
            handleActionClick(id);  // Call the handleActionClick function
        });

        // Clean up the search input event listener and DataTable on unmount
        return () => {
            searchInput.off('input'); // Clean up the input event listener
            $('#datatable-buttons tbody').off('click', '.action-button'); // Remove the delegated event listener
            table.destroy(); // Clean up the DataTable instance
        };
    }, [handleActionClick]);

    return (
        <>
            <PageTitle pageName="Registered Customer List" breadcrumbs={breadcrumbs} />
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Table body will be populated by DataTables */}
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