import PageTitle from "../../PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sub Category", link: "/service-sub-category" },
    { label: "All Sub Category" },
];

const AllSubCategory = (): JSX.Element => {
    return (
        <>
            <PageTitle pageName="All Sub Category" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default AllSubCategory;