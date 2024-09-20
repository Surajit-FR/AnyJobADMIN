import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Manage User" },
];

const ManageUser = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Manage User" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default ManageUser;