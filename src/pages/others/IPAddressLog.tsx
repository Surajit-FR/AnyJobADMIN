import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "System IP Logs" }
];

const IPAddressLog = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="System IP Logs" breadcrumbs={breadcrumbs} />

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <h4 className="text-center">Work In Progress....</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IPAddressLog;