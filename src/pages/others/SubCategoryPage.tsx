import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sub Category" }
];

const SubCategoryPage = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Sub Category" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default SubCategoryPage;