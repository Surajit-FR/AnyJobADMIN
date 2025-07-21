import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import {
    useEffect,
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
import { getAllServiceRequest } from "../../store/reducers/ServiceReducers";
import { CSVLink } from "react-csv"
// import { io } from 'socket.io-client';
import { API } from "../../store/api/Api";
import { getTimeDiffByMinutes } from "../../utils/timeDifference";


const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Request List" }
];
const headers = [
    { label: "User Name", key: "userName" },
    { label: "Actual Start Date", key: "serviceDate" },
    { label: "Requested Start Date", key: "createdAt" },
    { label: "Request Accept Date", key: "acceptedAt" },
    { label: "Time in Queue", key: "queueTime" },
    { label: "Tip Amount", key: "incentiveAmount" },
    { label: "Request Progress", key: "requestProgress" },
];


const ServiceRequestList = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { allServiceData } = useSelector((state: RootState) => state.serviceSlice)
    // const [pageValue, setPageValue] = useState<number>(1)
    // const [elemNum, setElemNum] = useState<number>(10)
    // const [searchStr, setSearchStr] = useState<string>('')


    // console.log("pageNum=====>", pageValue)
    // console.log("elemvalue=====>", elemNum)
    // console.log("search value=====>", searchStr)
    useEffect(() => {
        dispatch(getAllServiceRequest({
            params: {
                page: 1,
                limit: 10000,
                query: '',
                sortBy: '',
                sortType: 'asc',
            }
        }))
    }, [dispatch])
    // useEffect(() => {
    //     dispatch(getAllServiceRequest({
    //         params: {
    //             page: pageValue,
    //             limit: elemNum,
    //             query: '',
    //             sortBy: '',
    //             sortType: 'asc',
    //         }
    //     }))
    // }, [dispatch, pageValue,elemNum])

    const dataToExport = (data: any) => {
        return data.map((item: any) => (
            {
                userName: item.userId ? `${item.userId.firstName} ${item.userId.lastName}` : 'N/A',
                createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '--',
                serviceDate: item.serviceStartDate ? new Date(item.serviceStartDate).toLocaleDateString() : '--',
                acceptedAt:   item.acceptedAt ? new Date(item.acceptedAt).toLocaleDateString() : '--',
                queueTime:  item.acceptedAt ? `${getTimeDiffByMinutes(item.timeInQueue)}` : '--',
                isApproved: item.isApproved,
                incentiveAmount: item.incentiveAmount ? `$${item.incentiveAmount}` : '--',
                requestProgress: `${item.requestProgress}`,
            }
        ))
    }

    useEffect(() => {
        const handleViewDetails = (id: string) => {
            navigate(`/service-request-details/${id}`);
        };
        const table = $('#datatable-buttons').DataTable({
            "order": [[1, "desc"]],
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
            select: true,
            dom: '<"top d-flex justify-content-between align-items-center"lBf>rt<"bottom"ip>',
            buttons: [],
            stateSave: true,
            // {
            //     extend: 'csvHtml5',
            //     text: 'Export CSV',
            //     className: 'btn btn-primary btn-sm',
            //     exportOptions: exportOptions

            // }

            serverSide: true,
            processing: true,
            ajax: async (data: any, callback: Function) => {
                try {
                    const params = {
                        page: data.start / data.length + 1,
                        limit: data.length,
                        query: data.search.value || '',
                        sortBy: data.columns[data.order[0].column].name,
                        sortType: data.order[0].dir
                    };

                    const response = await API.get(`/service`, {
                        params,
                        withCredentials: true
                    });
                    const serviceData = response?.data?.data?.serviceRequests.map((item: any) => [
                        item.userId ? `${item.userId.firstName} ${item.userId.lastName}` : 'N/A',
                        item.requestProgress,
                        item.serviceStartDate ? new Date(item.serviceStartDate).toLocaleDateString() : '--',
                        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '--',
                        item.acceptedAt ? new Date(item.acceptedAt).toLocaleDateString() : '--',
                        item.acceptedAt ? `${getTimeDiffByMinutes(item.timeInQueue)}` : '--',
                        item.incentiveAmount ? `$${item.incentiveAmount}` : '--',
                        `<button class="btn btn-primary btn-sm view-details" data-id="${item._id}">View Details</button>`
                    ]);

                    const totalRecords = response.data.data.pagination.totalRecords;

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
                { title: "User Name", name: "firstName" },
                { title: "Request Progress", name: "createdAt", orderable: false },
                { title: "Requested Start Date", name: "serviceStartDate" },
                { title: "Service Create Date", name: "createdAt" },
                { title: "Service Accepted Date", name: "acceptedAt" },
                { title: "Time in Queue", name: "timeInQueue" },
                { title: "Incentive Amount", name: "incentiveAmount" },
                { title: "Actions", name: "createdAt", orderable: false },
            ],
        });

        // Handle button clicks
        $('#datatable-buttons').on('click', '.view-details', function () {
            const id = $(this).data('id');
            handleViewDetails(id);
        });

        const debouncedSearch = debounce((value: string) => {
            table.search(value).draw();
        }, 600);

        const searchInput = $('#datatable-buttons_filter input');

        searchInput.on('input', function () {
            const searchValue = $(this).val();
            // setSearchStr(searchValue as string)
            debouncedSearch(searchValue as string);
        });

        return () => {
            searchInput.off('input');
            $('#datatable-buttons').off('click', '.view-details');
            table.destroy();
        };
    }, [navigate]);

    return (
        <>
            <PageTitle pageName="Service Request List" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-12">
                    <div className="card">

                        <div className="card-body">
                            <div className="d-flex justify-content-sm-end mb-2 ">
                                <CSVLink data={dataToExport(allServiceData)} headers={headers} filename={"service-request-list.csv"}>
                                    <button className="btn btn-primary btn-md view-details">Download CSV</button>
                                </CSVLink>
                            </div>
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100" data-sort-order="desc">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Request Progress</th>
                                        <th>Service Start Date</th>
                                        <th>Service Create Date</th>
                                        <th>Service Accepted Date</th>
                                        <th>Time in Queue</th>
                                        <th>Incentive Amount</th>
                                        <th>Actions</th>
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

export default ServiceRequestList;