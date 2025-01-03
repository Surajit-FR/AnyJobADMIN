import { ISalesShiftsData } from "../../../types/shiftTypes";
import SaleShiftKpi from './SaleShiftKpi'

const SaleSheet = ({cardData}: { cardData: Array<ISalesShiftsData> }): JSX.Element => {
    return (
        <>
            {/* PageTitle section */}
         
            <div className="card">
                <div className="card-body">
                <SaleShiftKpi />
                </div>
            </div>
        </>
    );
};

export default SaleSheet;