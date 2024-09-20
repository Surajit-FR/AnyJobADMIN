import PageTitle from "../../components/PageTitle";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sale Sheet" }
];

const SaleSheet = (): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Sale Sheet" breadcrumbs={breadcrumbs} />
        </>
    );
};

export default SaleSheet;