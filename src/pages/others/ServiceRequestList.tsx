import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Request List" }
];

const ServiceRequestList = (): JSX.Element => {

    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Service Request List" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default ServiceRequestList;