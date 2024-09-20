import { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import $ from "jquery";
import axios from "axios";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";
import "datatables.net-buttons-bs5";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "List", link: "#" },
    { label: "Service Provider List" }
];

const ServiceProviderList = (): JSX.Element => {
    useEffect(() => {
        const table = $('#datatable-buttons').DataTable({
            responsive: true,
            fixedHeader: true,
            fixedColumns: true,
            select: true,
            buttons: ["copy", "csv", "excel", "pdf", "print"],
            serverSide: true, // Enable server-side processing
            processing: true, // Show processing indicator
            ajax: async (data: any, callback: Function) => {
                try {
                    // Construct the API parameters
                    const params = {
                        page: data.start / data.length + 1, // Page number (1-indexed)
                        limit: data.length, // Number of records per page
                        query: data.search.value || '', // Search query
                        sortBy: data.columns[data.order[0].column].data, // Column to sort by
                        sortType: data.order[0].dir // Sort direction
                    };

                    // Log the parameters being sent to the API
                    console.log('API Request Params:', params);

                    // Make the API request
                    const response = await axios.get('/api/your-endpoint', { params });

                    // Call the callback with the data from the server
                    callback({
                        draw: data.draw, // Draw counter for DataTables
                        recordsTotal: response.data.total, // Total records in the database
                        recordsFiltered: response.data.filteredTotal, // Total records after filtering
                        data: response.data.data.map((item: any) => [
                            item.name,
                            item.position,
                            item.office,
                            item.age,
                            item.start_date,
                            item.salary
                        ]) // Data for DataTables
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            columns: [
                { data: "name", title: "Name" },
                { data: "position", title: "Position" },
                { data: "office", title: "Office" },
                { data: "age", title: "Age" },
                { data: "start_date", title: "Start date" },
                { data: "salary", title: "Salary" }
            ],
        });

        return () => {
            table.destroy();
        };
    }, []);

    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Service Provider List" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <table id="datatable-buttons" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Office</th>
                                        <th>Age</th>
                                        <th>Start date</th>
                                        <th>Salary</th>
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

export default ServiceProviderList;