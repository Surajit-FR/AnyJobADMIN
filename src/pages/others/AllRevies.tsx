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
    { label: "All Reviews" }
];


const AllReviews = (): JSX.Element => {
    // const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    // const { ipData } = useSelector((state: RootState) => state.ipSlice)
    // console.log({ ipData })
    // useEffect(() => {
    //     dispatch(getIpDataRequest({ data: { page: 1, limit: 10 } }))
    // }, [dispatch])

    useEffect(() => {
        // let ipData: any[]= []
        const table = $('#datatable-buttons').DataTable({
            "order": [[1, "desc"]],
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
            select: true,
            buttons: [],
            serverSide: true,
            processing: true,
            stateSave: true,
            ajax: async (data: any, callback: Function) => {
                try {
                    const params = {
                        page: data.start / data.length + 1,
                        limit: data.length,
                        query: data.search.value || '',
                        // sortBy: data.columns[data.order[0].column].name,
                        sortType: data.order[0].dir
                    };

                    const response = await API.get(`/rating/fetch-user-ratings`, {
                        params,
                        withCredentials: true
                    });
                    console.log("resp", response?.data?.data)
                    // ipData= response?.data?.data
                    const customerData = response?.data?.data?.userReviews?.map((item: any, index: number) => [
                        `<span className="account-user-avatar rounded"><img src=${item?.ratedBy_avatar || "/assets/images/users/avatar-3.jpg"} className="rounded-circle " width="32" /></span> ${item?.ratedBy_firstName} ${item?.ratedBy_lastName} (${item?.ratedBy_userType})` || '-- --',
                        `<span className="account-user-avatar rounded"><img src=${item?.ratedTo_avatar || "/assets/images/users/avatar-3.jpg"} className="rounded-circle " width="32" /></span> ${item?.ratedTo_firstName} ${item?.ratedTo_lastName} (${item?.ratedTo_userType})` || '-- --',
                        new Date(item?.createdAt).toLocaleDateString() || '-- --',
                        item?.rating || '-- --',
                        item?.comments || '-- --',
                    ]);

                    const totalRecords = response.data?.data?.pagination?.total;

                    callback({
                        draw: data.draw,
                        recordsTotal: totalRecords || 0,
                        recordsFiltered: totalRecords || 0,
                        data: customerData
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            columns: [
                { title: "Reviewed from", name: 'ratedFrom_firstName', orderable: false },
                { title: "Reviewed To", name: "ratedTo_firstName", orderable: false },
                { title: "Date Rated", name: 'createdAt', orderable: false },
                { title: "Rating", name: "rating", orderable: false },
                { title: "Comment", name: 'comments', orderable: false },
                // {
                //     title: "Action",
                //     name:'action',
                //     orderable:false,
                //     render: (data: any, type: any, row: any) => {
                //         return `
                //             <a href="#" class="btn btn-primary btn-sm action-button" data-id="${row[4]}" data-val="${row[5]}"}">
                //                 View Details
                //             </a>
                //         `;
                //     }
                // }

            ],
        });

        // $('#datatable-buttons tbody').on('click', '.action-button', function (event) {
        //     event.preventDefault();
        //     const value = $(this).data('val')
        //     // const filteredData= ipData.filter(item => item._id === value)
        //     // navigate(`/system-ip-logs-details`,{state: JSON.stringify(filteredData[0])});
        // });

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
            {/* PageTitle section */}
            <PageTitle pageName="System IP Logs" breadcrumbs={breadcrumbs} />

            <div className="card">
                <div className="card-body">
                    <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                        <thead>
                            <tr>
                                <th>Rated To</th>
                                <th>Rated from</th>
                                <th>Date Rated</th>
                                <th>Rating</th>
                                <th>Comment</th>
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

export default AllReviews;