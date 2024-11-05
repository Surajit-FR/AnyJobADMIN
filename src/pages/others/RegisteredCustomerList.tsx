import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import $ from "jquery";
import axios from "axios";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import { REACT_APP_BASE_URL } from "../../config/app.config";
import { debounce } from "lodash";
// import { AppDispatch } from "../../store/Store";
// import { useDispatch } from "react-redux";
import ConfirmationModal from "../../components/ConfirmationModal";
import { showToast } from "../../utils/Toast";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Registered Customer List" }
];

const RegisteredCustomerList = (): JSX.Element => {
    const [itemId, setItemID] = useState<string>("");
    const [isBanned, setIsBanned] = useState<boolean>(false);

    // const dispatch: AppDispatch = useDispatch();

    const handleBanUnban = async (userId: string, isBanned: boolean) => {
        if (userId) {
            let isDeleted = isBanned ? false : true;
            try {
                const resp = await axios.patch(`${REACT_APP_BASE_URL}/user/u/${userId}`, { isDeleted }, { withCredentials: true });

                if (resp?.data?.success) {
                    console.log({ resp: resp?.data });
                    $('#datatable-buttons').DataTable().ajax.reload();
                    showToast({ message: resp?.data?.message, type: 'success', durationTime: 3500, position: "top-center" });
                };
            } catch (error) {
                console.error(`Error while trying to ${isDeleted} user:`, error);
            }
        }
    };

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
                        `${item?.firstName} ${item?.lastName}` || '-- --',
                        item?.email || '-- --',
                        item?.phone || '-- --',
                        new Date(item?.createdAt).toLocaleDateString() || '-- --',
                        item?.avgRating || "-- --",
                        `<button class="btn btn-sm btn-${item?.isDeleted ? 'success' : 'danger'}" 
                                 data-id="${item?._id}" 
                                 data-banned="${item?.isDeleted}" 
                                 data-bs-toggle="modal" 
                                 data-bs-target="#ban-alert-modal">${item?.isDeleted ? 'Unban' : 'Ban'}</button>`
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
                { title: "Phone" },
                { title: "Date Registered" },
                { title: "Avg. Rating" },
                { title: "Actions", orderable: false }
            ],
        });

        // Handle click event for action buttons
        $('#datatable-buttons tbody').on('click', 'button', function () {
            const userId = $(this).data('id');
            const isBannedStatus = $(this).data('banned');
            setItemID(userId);
            setIsBanned(isBannedStatus);
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
    }, []);

    return (
        <>
            <PageTitle pageName="Registered Customer List" breadcrumbs={breadcrumbs} />

            <ConfirmationModal
                modalId="ban-alert-modal"
                modalText={"Want To Ban The Customer?"}
                onDelete={() => handleBanUnban(itemId, isBanned)}
            />

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
                                        <th>Date Registered</th>
                                        <th>Avg. Rating</th>
                                        <th>Actions</th>
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