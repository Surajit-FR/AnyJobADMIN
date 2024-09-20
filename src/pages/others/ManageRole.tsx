import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Manage Role" },
];

const ManageRole = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Manage Role" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default ManageRole;