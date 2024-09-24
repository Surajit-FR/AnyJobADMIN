import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Manage Que" }
];


const ManageQue = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Manage Que" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default ManageQue;