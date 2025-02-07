import { useDispatch, useSelector } from "react-redux";
import AddShift from "../../components/core/shift/AddShift";
import ListShift from "../../components/core/shift/ListShift";
import PageTitle from "../../components/PageTitle";
import { AppDispatch, RootState } from "../../store/Store";
import { useEffect, useState } from "react";
import { deleteShiftRequest, getAllShiftRequest } from "../../store/reducers/ShiftReducers";
import ConfirmationModal from "../../components/ConfirmationModal";
import UpdateShiftModal from "../../components/core/shift/UpdateShiftModal";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Manage Service Shift" }
];

const ManageShiftPage = (): JSX.Element => {
    const { shiftData } = useSelector((state: RootState) => state.shiftSlice);
    const [itemId, setItemID] = useState<string>("");
    const [itemName, setItemName] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteShiftRequest({ shiftId: itemId }));
    };

    useEffect(() => {
        dispatch(getAllShiftRequest('shiftSlice/getAllShiftRequest'));
    }, [dispatch]);
console.log({shiftData})
    return (
        <>
            <PageTitle pageName="Manage Service Shift" breadcrumbs={breadcrumbs} />

            <UpdateShiftModal />

            <ConfirmationModal
                modalId="delete-alert-modal"
                modalText={`Want To Delete The Shift "${itemName}"?`}
                onDelete={handleDelete}
            />

            <div className="row">
                <ListShift
                    shiftData={shiftData ?? []}
                    setItemID={setItemID}
                    setItemName={setItemName}
                />

                <AddShift />
            </div>
        </>
    );
};

export default ManageShiftPage;