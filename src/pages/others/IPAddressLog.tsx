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
        </>
    );
};

export default IPAddressLog;