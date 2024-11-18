import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Manage Queue" }
];


const ManageQueue = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Manage Queue" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default ManageQueue;