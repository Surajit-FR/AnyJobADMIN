// import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
// import $ from "jquery";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
// import { debounce } from "lodash";
// import { AppDispatch, RootState } from "../../store/Store";
// import { useEffect } from "react";
// import { API } from "../../store/api/Api";
// import { getIpDataRequest } from "../../store/reducers/IpReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "System IP Logs" }
];


const IPAddressLog = (): JSX.Element => {
    // const dispatch: AppDispatch = useDispatch();
    // const { ipData } = useSelector((state: RootState) => state.ipSlice)
    // console.log({ipData})
    // useEffect(()=>{
    //     dispatch(getIpDataRequest({page:1}))
    // },[dispatch])
    // useEffect(() => {
    //     const table = $('#datatable-buttons').DataTable({
    //         responsive: true,
    //         fixedHeader: true,
    //         fixedColumns: true,
    //         select: true,
    //         buttons: ["copy", "csv", "excel", "pdf", "print"],
    //         serverSide: true,
    //         processing: true,
    //         ajax: async (data: any, callback: Function) => {
    //             try {
    //                 const params = {
    //                     page: data.start / data.length + 1,
    //                     limit: data.length,
    //                     query: data.search.value || '',
    //                     sortBy: "createdAt",
    //                     sortType: data.order[0].dir
    //                 };

    //                 const response = await API.get(`/user/get-registered-customers`, {
    //                     params,
    //                     withCredentials: true
    //                 });

    //                 const customerData = response?.data?.data?.customers.map((item: any) => [
    //                     `${item?.firstName} ${item?.lastName}` || '-- --',
    //                     item?.email || '-- --',
    //                     item?.phone || '-- --',
    //                     new Date(item?.createdAt).toLocaleDateString() || '-- --',
    //                     item?.avgRating || "-- --",
    //             
    //                 ]);

    //                 const totalRecords = response.data.data.pagination.total;

    //                 callback({
    //                     draw: data.draw,
    //                     recordsTotal: totalRecords,
    //                     recordsFiltered: totalRecords,
    //                     data: customerData
    //                 });
    //             } catch (error) {
    //                 console.error('Error fetching data:', error);
    //             }
    //         },
    //         columns: [
    //             { title: "Name" },
    //             { title: "Email" },
    //             { title: "Phone" },
    //             { title: "Date Registered" },
    //             { title: "Avg. Rating" },
    //             { title: "Actions", orderable: false }
    //         ],
    //     });

    //     // Handle click event for action buttons
    //     $('#datatable-buttons tbody').on('click', 'button', function () {
    //         const userId = $(this).data('id');
    //         const isBannedStatus = $(this).data('banned');
    //     });

    //     const debouncedSearch = debounce((value: string) => {
    //         table.search(value).draw();
    //     }, 600);

    //     const searchInput = $('#datatable-buttons_filter input');

    //     searchInput.on('input', function () {
    //         const searchValue = $(this).val();
    //         debouncedSearch(searchValue as string);
    //     });

    //     return () => {
    //         searchInput.off('input');
    //         table.destroy();
    //     };
    // }, []);
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="System IP Logs" breadcrumbs={breadcrumbs} />

            <div className="card">
                <div className="card-body">
                    {/* <div className="row">
                        <h4 className="text-center">This is iplog page</h4>
                    </div> */}

                </div>
            </div>
        </>
    );
};

export default IPAddressLog;