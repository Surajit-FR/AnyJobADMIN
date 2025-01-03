import PageTitle from "../../components/PageTitle";
import SaleSheetComponent from "../../components/SalesShift";
import salesSheetData from '../../components/SalesShift/salesShiftCardData.json'

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sale Sheet" }
];

const SaleSheet = (): JSX.Element => {
    return (
        <>
            <PageTitle pageName="Sale Sheet" breadcrumbs={breadcrumbs} />
            <SaleSheetComponent cardData={salesSheetData}/>
        </>
    );
};

export default SaleSheet;