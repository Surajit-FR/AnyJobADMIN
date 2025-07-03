import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import {
    useEffect, useState,
    //  useState
} from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { CSVLink } from "react-csv"
// import { io } from 'socket.io-client';
import { API } from "../../store/api/Api";
import { getAllTransactionsRequest } from "../../store/reducers/TransactionReducers";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getDashboardCardDataRequest } from "../../store/reducers/DashboardReducer";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Transactions History" }
];
const headers = [
    { label: "Transaction Id", key: "stripeTransactionId" },
    { label: "Type", key: "type" },
    { label: "Amount", key: "amount" },
    { label: "Time", key: "createdAt" },
    { label: "Service Type", key: "categoryName" },
    { label: "Description", key: "description" },
];


const TransactionsList = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { transactionData } = useSelector((state: RootState) => state.transactionSlice)
    const { dashboardCardData } = useSelector((state: RootState) => state.dashboardSlice)
    const [queryToFetch, setQueryToFetch] = useState('')

    const [total, setTotal] = useState(0);

    useEffect(() => {
        dispatch(getDashboardCardDataRequest('DashboardSlice/getDashboardCardDataRequest'))
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllTransactionsRequest({
            params: {
                page: 1,
                limit: 10000,
                query: queryToFetch,
                sortBy: '',
                sortType: 'asc',
            }
        }))
    }, [dispatch, queryToFetch])
    useEffect(() => {
        if (transactionData && transactionData.length > 0) {
            setTotal(transactionData.length)
        }
    }, [transactionData,queryToFetch])
console.log(transactionData);


    const formatDescLabel = (label: string) => {
        const result = label.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;

    }
    const dataToExport = (data: any) => {
        return data?.map((item: any) => (
            {
                stripeTransactionId: item.stripeTransactionId,
                type: item.type,
                createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '--',
                amount: `${item.currency?.toUpperCase()} ${item.amount}`,
                categoryName: item.categoryName,
                description: formatDescLabel(item.description),
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
            buttons: [],
            stateSave: true,
            serverSide: true,
            processing: true,
            ajax: async (data: any, callback: Function) => {
                try {
                    const params = {
                        page: data.start / data.length + 1,
                        limit: data.length,
                        query: data.search.value || '',
                        // sortBy: 'createdAt',
                        // sortType: "asc"
                    };

                    const response = await API.get(`/user/fetch-admin-all-transactions`, {
                        params,
                        withCredentials: true
                    });

                    const TransactionData = response?.data?.data?.transactionsData.map((item: any) => [
                        item.stripeTransactionId ? `${item.stripeTransactionId}` : 'N/A',
                        `${item.type}`,
                        `${item.currency?.toUpperCase()} ${item.amount}`,
                        item.createdAt ? new Date(item.createdAt).toLocaleString() : '--',
                        item.categoryName,
                        formatDescLabel(item.description)
                    ]);

                    // const totalRecords = response.data.data.pagination.totalRecords;

                    callback({
                        draw: data.draw,
                        recordsTotal: total,
                        recordsFiltered: total,
                        data: TransactionData
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            columns: [
                { title: "Transaction Id", name: "stripeTransactionId", orderable: false },
                { title: "Type", name: "type", orderable: false },
                { title: "Amount", name: "amount", orderable: false },
                { title: "Time", name: "createdAt", orderable: false },
                { title: "Service Type", name: "categoryName", orderable: false },
                { title: "Description", name: "description", orderable: false },
            ],
            "columnDefs": [
                { "orderable": false, "targets": "_all" } // Applies the option to all columns
            ],
            ordering: false,
        });

        // Handle button clicks

        const debouncedSearch = debounce((value: string) => {
            table.search(value).draw();
            setQueryToFetch(value)
        }, 600);

        const searchInput = $('#datatable-buttons_filter input');

        searchInput.on('input', function () {
            const searchValue = $(this).val();
            // setSearchStr(searchValue as string)
            debouncedSearch(searchValue as string);
        });

        return () => {
            searchInput.off('input');
            table.destroy();
        };
    }, [navigate, total]);

    return (
        <>
            <PageTitle pageName="Transactions" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="d-flex justify-content-sm-end mb-2">
                                <CSVLink data={dataToExport(transactionData)} headers={headers} filename={"transactions-history.csv"}>
                                    <button className="btn btn-primary btn-md view-details">Download CSV</button>
                                </CSVLink>
                            </div>
                            <div className="row">
                                <p className="mb-1 fw-bold" >Transaction Status</p>
                            </div>
                            {
                                dashboardCardData && (
                                    <>
                                        <ProgressBar>
                                            <ProgressBar now={100 - (dashboardCardData?.balance?.avilable / (dashboardCardData?.balance?.avilable + dashboardCardData?.balance?.pending)) * 100} style={{ background: '#eeeef1' }} />
                                            <ProgressBar now={(dashboardCardData?.balance?.avilable / (dashboardCardData?.balance?.avilable + dashboardCardData?.balance?.pending)) * 100} variant="primary" />
                                        </ProgressBar>
                                        <div className="row align-items-center justify-content-between p-1">
                                            <div style={{ width: "fit-content" }} className="row align-items-center">

                                                <div style={{ width: '10px', height: '10px', background: "#eeeef1", borderRadius: "50%" }}>
                                                </div>
                                                <span style={{ width: "fit-content" }}>
                                                    Pending
                                                </span>
                                            </div>
                                            <span style={{ width: "fit-content" }} className="fw-bold">
                                                $ {dashboardCardData?.balance?.pending/100}
                                            </span>
                                        </div>
                                        <div className="row align-items-center justify-content-between p-1 mb-3" style={{ background: '#f8f9fa' }}>
                                            <div style={{ width: "fit-content" }} className="row align-items-center">
                                                <div style={{ width: '10px', height: '10px', background: "#4254ba", borderRadius: "50%" }}></div>
                                                <span style={{ width: "fit-content" }}>
                                                    Available Balance
                                                </span>
                                            </div>
                                            <span style={{ width: "fit-content" }} className="fw-bold">
                                                $ {dashboardCardData?.balance?.avilable/100}
                                            </span>
                                        </div>
                                    </>
                                )
                            }

                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Transaction Id</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Time</th>
                                        <th>Service Type</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            {/* <button onClick={() => connect()}> Change Page </button> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionsList;