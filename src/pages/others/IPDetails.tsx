import GoogleMapReact from "google-map-react";
import { GOOGLE_API_KEY } from "../../config/app.config";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
import PageTitle from "../../components/PageTitle";
const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "IP Details" }
];
const location = {
    address: "MY LOCATION",
    lat: 22.518,
    lng: 88.3832,
};
interface Props {
    text: string
    lat: number
    lng: number
}

const LocationPin = ({ text }: Props): JSX.Element => (
    <div className="pin" style={{  }}>
        {/* <i className="ri-close-fill align-middle"></i> */}
        <Icon icon={locationIcon} className="pin-icon" style={{height: "50px", width:"50px", marginBottom:"5px"}}/>
        <p className="pin-text"
            style={{ minWidth: '200px', minHeight: '20px', backgroundColor: "#84adad91", fontSize:"large", fontWeight: "bold", borderRadius :"10px", padding: "1em"}}
        >{text}</p>
    </div>
);

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
                    <div style={{ width: "700px", height: "700px" }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                            defaultCenter={location}
                            defaultZoom={17}>
                            <LocationPin
                                lat={location.lat}
                                lng={location.lng}
                                text={location.address}
                            />
                        </GoogleMapReact>
                    </div>

                </div>
            </div>
        </>
    );
};

export default IPAddressLog;