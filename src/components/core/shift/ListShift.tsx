import { useDispatch } from "react-redux";
import { TShift } from "../../../../types/shiftTypes";
import { AppDispatch } from "../../../store/Store";
import { getShiftRequest } from "../../../store/reducers/ShiftReducers";

const ListShift = ({
    shiftData,
    setItemID,
    setItemName,
}: {
    shiftData: Array<TShift>,
    setItemID: (id: string) => void;
    setItemName: (name: string) => void;
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="header-title mb-3">Service Shifts</h4>
                        <div className="row">
                            {
                                shiftData?.length > 0 ?
                                    shiftData.map((shift) => (
                                        <div key={shift?._id} className="col-lg-4 mb-3">
                                            <div className="card shadow-none border">
                                                <div className="m-2">
                                                    <h5>{shift?.shiftName?.charAt(0)?.toUpperCase() + shift?.shiftName?.slice(1)}</h5>
                                                </div>
                                                <div>
                                                    <ul>
                                                        {shift?.shiftTimes?.map((time) => (
                                                            <li key={time?._id}>
                                                                {time?.startTime} - {time?.endTime}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="d-flex justify-content-end m-2">
                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#centermodal"
                                                        className="btn btn-soft-primary btn-sm me-2"
                                                        onClick={() => dispatch(getShiftRequest({ shiftId: shift?._id }))}
                                                    ><i className="ri-pencil-line"></i></button>
                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#delete-alert-modal"
                                                        className="btn btn-soft-dark btn-sm"
                                                        onClick={() => {
                                                            setItemID(shift?._id);
                                                            setItemName(shift?.shiftName);
                                                        }}
                                                    ><i className="ri-delete-bin-line"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : <h6 className="text-center">No Shift Added Yet</h6>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListShift;