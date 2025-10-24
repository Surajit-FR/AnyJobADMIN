import { useCallback, useEffect, useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import $ from "jquery";
// import axios from "axios";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
// import { REACT_APP_BASE_URL } from "../../config/app.config";
import { debounce } from "lodash";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../components/ConfirmationModal";
import { showToast } from "../../utils/Toast";
import { CSVLink } from "react-csv";
import { getAllCustomerDataRequst } from "../../store/reducers/CustomerReducers";
import { API, REMOVEUSER, UPDATEBAN } from "../../store/api/Api";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Registered Customer List" }
];
const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Registered Date", key: "dateRegistered" },
    { label: "Avg. Rating", key: "customerAvgRating" },
    { label: "Status", key: "status" },
];
const RegisteredCustomerList = (): JSX.Element => {
    const { allCustomerData } = useSelector((state: RootState) => state.customerSlice)
    const dispatch: AppDispatch = useDispatch();
    const csvRef = useRef<any>(null)
    const [download, setDownload] = useState(false)
    const [itemId, setItemID] = useState<string>("");
    const [isBanned, setIsBanned] = useState<boolean>(false);

    const dataToExport = (data: any) => {
        return data.map((item: any) => (
            {
                name: `${item?.firstName} ${item?.lastName}` || '-- --',
                email: item?.email || '-- --',
                phone: item?.phone || '-- --',
                dateRegistered: new Date(item?.createdAt).toLocaleDateString() || '-- --',
                customerAvgRating: item?.customerAvgRating || "-- --",
                status: item?.isDeleted ? 'Banned' : 'Regular',
            }
        ))
    }

    const handleBanUnban = async (userId: string, isBanned: boolean) => {
        if (userId) {
            let isDeleted = isBanned ? false : true;
            try {
                const resp = await UPDATEBAN(userId, { isDeleted });

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
    const handleDeleteUser = async (userId: string) => {
        if (userId) {
            try {
                const resp = await REMOVEUSER(userId);

                if (resp?.data?.success) {
                    console.log({ resp: resp?.data });
                    $('#datatable-buttons').DataTable().ajax.reload();
                    showToast({ message: resp?.data?.message, type: 'success', durationTime: 3500, position: "top-center" });
                }
            } catch (error) {
                console.error(`Error while trying to delete user:`, error);
            }
        }
    };
    const handleCsvdownload = useCallback(() => {
        setDownload(true)
        dispatch(getAllCustomerDataRequst({
            params: {
                page: 1,
                limit: 10000,
                query: '',
                sortBy: '',
                sortType: 'asc',
            }
        }))
    }, [dispatch])

    useEffect(() => {
        const table = $('#datatable-buttons').DataTable({
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
            select: true,
            buttons: ["copy", "csv", "excel", "pdf", "print"],
            serverSide: true,
            processing: true,
            stateSave: true,
            "order": [[1, "desc"]],
            ajax: async (data: any, callback: Function) => {
                try {
                    const params = {
                        page: data.start / data.length + 1,
                        limit: data.length,
                        query: data.search.value || '',
                        sortBy: "createdAt",
                        sortType: data.order[0].dir
                    };

                    const response = await API.get(`/user/get-registered-customers`, {
                        params,
                        withCredentials: true
                    });

                    const customerData = response?.data?.data?.customers.map((item: any) => [
                        `${item?.firstName} ${item?.lastName}` || '-- --',
                        item?.email || '-- --',
                        item?.phone || '-- --',
                        new Date(item?.createdAt).toLocaleDateString() || '-- --',
                        item?.customerAvgRating ? `${item.customerAvgRating}/5`: "-- --",
                        `<button class="btn btn-sm btn-soft-${item?.isDeleted ? 'success' : 'danger'}" 
                                 data-id="${item?._id}" 
                                 data-banned="${item?.isDeleted}" 
                                 data-bs-toggle="modal" 
                                 data-bs-target="#ban-alert-modal">${item?.isDeleted ? 'Unban' : 'Ban'}</button>`,
                        `<button class="btn btn-sm btn-soft-danger" 
                                 data-id="${item?._id}" 
                                 data-banned="${item?.isDeleted}" 
                                 data-bs-toggle="modal" 
                                 data-bs-target="#delete-alert-modal">Remove</button>`
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
                { title: "Actions", orderable: false },
                { title: "Remove", orderable: false }
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

    useEffect(() => {
        if (allCustomerData && allCustomerData.length > 0 && download) {
            csvRef.current?.link.click()
            setDownload(false)
        }
    }, [allCustomerData, download])

    return (
        <>
            <PageTitle pageName="Registered Customer List" breadcrumbs={breadcrumbs} />

            <ConfirmationModal
                modalId="ban-alert-modal"
                modalText={`Want To ${isBanned ? "Unban" : "Ban"} The Customer?`}
                onDelete={() => handleBanUnban(itemId, isBanned)}
            />
            <ConfirmationModal
                modalId="delete-alert-modal"
                modalText={"Want To Remove The User?"}
                onDelete={() => handleDeleteUser(itemId)}
            />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-sm-end mb-2 ">
                                {download && <CSVLink data={dataToExport(allCustomerData)} headers={headers} filename={"All-Customers-list.csv"} ref={csvRef} />}
                                <button className="btn btn-primary btn-md view-details" onClick={()=>handleCsvdownload()}>Download CSV</button>
                                {/* </CSVLink> */}
                            </div>
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Date Registered</th>
                                        <th>Avg. Rating</th>
                                        <th>Actions</th>
                                        <th>Remove</th>
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