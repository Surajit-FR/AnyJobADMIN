import AddCategory from "../../components/core/category/AddCategory";
import ListCategory from "../../components/core/category/ListCategory";
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
            <div className="row">
                {/* AddCategory Section */}
                <AddCategory />

                {/* ListCategory Section */}
                <ListCategory />
            </div>
        </>
    );
};

export default CategoryPage;