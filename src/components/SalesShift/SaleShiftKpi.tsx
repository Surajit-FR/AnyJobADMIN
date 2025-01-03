import PageTitle from "../../components/PageTitle";
import SaleSheetComponent from "../../components/SalesShift";
import { ISalesShiftsData } from "../../../types/shiftTypes";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sale Sheet" }
];

// const SaleSheet = ({cardData}: { cardData: ISalesShiftsData }): JSX.Element => {
const SaleSheet = (): JSX.Element => {
    return (
        <>
            {/* <SaleSheetComponent cardData={ISalesS}/> */}
            <div className="col" >
                        <div className="card widget-icon-box" >
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h2 className="text-muted text-uppercase fs-13 mt-0" title={"Gross Profit Margin"}>
                                            {/* {card.title} */}
                                            Gross Profit Margin
                                        </h2>
                                        <h3 className="my-3">84%</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
};

export default SaleSheet;