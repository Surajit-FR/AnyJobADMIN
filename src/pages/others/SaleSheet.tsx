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

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <h4 className="text-center">Work In Progress....</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleSheet;