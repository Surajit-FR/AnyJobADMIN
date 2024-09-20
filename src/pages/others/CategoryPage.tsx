import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Category" }
];

const CategoryPage = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Category" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default CategoryPage;