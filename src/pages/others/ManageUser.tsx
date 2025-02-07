import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import ConfirmationModal from "../../components/ConfirmationModal";
import { showToast } from "../../utils/Toast";
import AddAdminUser from "../../components/core/AddAdminUser";
import { API, UPDATEBAN } from "../../store/api/Api";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Manage User" },
];

const ManageUser = (): JSX.Element => {
    const [itemId, setItemID] = useState<string>("");
    const [isBanned, setIsBanned] = useState<boolean>(false);

    const handleBanUnban = async (userId: string, isBanned: boolean) => {
        if (userId) {
            let isDeleted = isBanned ? false : true;
            try {
                const resp = await UPDATEBAN(userId, { isDeleted });

                if (resp?.data?.success) {
                    console.log({ resp: resp?.data });
                    $('#datatable-buttons').DataTable().ajax.reload();
                    showToast({ message: resp?.data?.message, type: 'success', durationTime: 3500, position: "top-center" });
                }
            } catch (error) {
                console.error(`Error while trying to ${isDeleted ? "ban" : "unban"} user:`, error);
            }
        }
    };

    useEffect(() => {
        const table = $('#datatable-buttons').DataTable({
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
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

                    const response = await API.get(`/user/get-admin-users`, {
                        params,
                        withCredentials: true
                    });

                    const customerData = response?.data?.data?.adminUsers?.map((item: any) => [
                        `${item?.firstName} ${item?.lastName}` || '-- --',
                        item?.email || '-- --',
                        item?.phone || '-- --',
                        item?.userType || '-- --', // Added User Type column
                        `<button class="btn btn-sm btn-soft-${item?.isDeleted ? 'success' : 'danger'}" 
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
                { title: "User Type" }, // New column for User Type
                { title: "Actions", orderable: false }
            ],
        });

        $('#datatable-buttons tbody').on('click', 'button', function () {
            const userId = $(this).data('id');
            const isBannedStatus = $(this).data('banned');
            setItemID(userId);
            setIsBanned(isBannedStatus);
        });

        return () => {
            table.destroy();
        };
    }, []);

    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Manage User" breadcrumbs={breadcrumbs} />

            <ConfirmationModal
                modalId="ban-alert-modal"
                modalText={"Want To Ban The User?"}
                onDelete={() => handleBanUnban(itemId, isBanned)}
            />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <button
                                className="btn btn-primary mb-3"
                                data-bs-toggle="modal"
                                data-bs-target="#custom-modal"
                            >
                                Add Admin User
                            </button>
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>User Type</th>
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

            {/* Custom Modal */}
            <AddAdminUser />
        </>
    );
};

export default ManageUser;