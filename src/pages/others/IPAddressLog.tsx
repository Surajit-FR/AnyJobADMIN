// import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import { useEffect } from "react";
// import { getIpDataRequest } from "../../store/reducers/IpReducers";
// import { AppDispatch, RootState } from "../../store/Store";
import { debounce } from "lodash";
import { API } from "../../store/api/Api";
// import { getIpDataRequest } from "../../store/reducers/IpReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "System IP Logs" }
];


const IPAddressLog = (): JSX.Element => {
    // const dispatch: AppDispatch = useDispatch();
      const navigate = useNavigate();
    // const { ipData } = useSelector((state: RootState) => state.ipSlice)
    // console.log({ ipData })
    // useEffect(() => {
    //     dispatch(getIpDataRequest({ data: { page: 1, limit: 10 } }))
    // }, [dispatch])

    useEffect(() => {
        let ipData: any[]= []
        const table = $('#datatable-buttons').DataTable({
            "order": [[1, "desc"]],
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
            select: true,
            buttons: ["copy", "csv", "excel", "pdf", "print"],
            serverSide: true,
            processing: true,
            stateSave:true,
            ajax: async (data: any, callback: Function) => {
                try {
                    const params = {
                        page: data.start / data.length + 1,
                        limit: data.length,
                        query: data.search.value || '',
                        sortBy: data.columns[data.order[0].column].name,
                        sortType: data.order[0].dir
                    };

                    const response = await API.get(`/user/fetch-iplogs`, {
                        params,
                        withCredentials: true
                    });
                    ipData= response?.data?.data?.ipLogs
                    const customerData = response?.data?.data?.ipLogs.map((item: any,index: number) => [
                        `${item?.ipAddress}` || '-- --',
                        new Date(item?.timestamp).toLocaleDateString() || '-- --',
                        `${item?.userId[0].firstName} ${item?.userId[0].lastName}` || '-- --',
                        item?.country || '-- --',
                        item?.route || '-- --',
                        item?._id
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
                { title: "Ip Address", name:"ipAddress", orderable:false },
                { title: "Time",name:'timestamp'  },
                { title: "Name",name: 'name',orderable:false },
                { title: "Country", name:"country", orderable:false },
                { title: "Route",name:'route',orderable:false },
                {
                    title: "Action",
                    name:'action',
                    orderable:false,
                    render: (data: any, type: any, row: any) => {
                        return `
                            <a href="#" class="btn btn-primary btn-sm action-button" data-id="${row[4]}" data-val="${row[5]}"}">
                                View Details
                            </a>
                        `;
                    }
                }

            ],
        });

        $('#datatable-buttons tbody').on('click', '.action-button', function (event) {
            event.preventDefault();
            const value = $(this).data('val')
            const filteredData= ipData.filter(item => item._id === value)
            navigate(`/system-ip-logs-details`,{state: JSON.stringify(filteredData[0])});
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
    }, [navigate]);
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="System IP Logs" breadcrumbs={breadcrumbs} />

            <div className="card">
                <div className="card-body">
                    <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Ip Address</th>
                                        <th>Name</th>
                                        <th>Country</th>
                                        <th>Region</th>
                                        <th>Date Registered</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                </div>
            </div>
        </>
    );
};

export default IPAddressLog;