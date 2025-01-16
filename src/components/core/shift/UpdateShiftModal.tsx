import { useEffect } from "react"; // Import useEffect
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { TShiftPayload } from "../../../../types/shiftTypes";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTimeFormat } from "../../../hooks/useTimeFormat";
import { updateShiftRequest } from "../../../store/reducers/ShiftReducers";

// Function to convert 12-hour time format to 24-hour format
const convertTo24HourFormat = (timeString: string) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
        hours = (parseInt(hours, 10) + 12).toString();
    }
    if (modifier === "AM" && hours === "12") {
        hours = "00";
    }

    // Ensure two-digit format
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

const UpdateShiftModal = (): JSX.Element => {
    const { singleShiftData } = useSelector((state: RootState) => state.shiftSlice);
    const dispatch: AppDispatch = useDispatch();

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm<TShiftPayload>({
        defaultValues: {
            shiftName: "",
            shiftTimes: [{ startTime: "", endTime: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "shiftTimes"
    });

    const { convertTo12HourFormat } = useTimeFormat();

    // Update the form data whenever singleShiftData changes
    useEffect(() => {
        if (singleShiftData) {
            // Format the shift times from singleShiftData
            const formattedShiftTimes = singleShiftData?.shiftTimes?.map(shift => ({
                startTime: convertTo24HourFormat(shift.startTime),
                endTime: convertTo24HourFormat(shift.endTime)
            }));

            // Reset the form with the new values
            reset({
                shiftName: singleShiftData.shiftName,
                shiftTimes: formattedShiftTimes
            });
        }
    }, [singleShiftData, reset]);

    const onSubmit = (data: TShiftPayload) => {
        // Format the shift times back to 12-hour format for submission
        const formattedShiftTimes = data.shiftTimes.map(shift => ({
            startTime: convertTo12HourFormat(shift.startTime),
            endTime: convertTo12HourFormat(shift.endTime)
        }));

        const formattedData = {
            shiftName: data?.shiftName,
            shiftTimes: formattedShiftTimes
        };

        dispatch(updateShiftRequest({ shiftId: singleShiftData?._id, data: formattedData, reset }));
    };

    return (
        <>
            <div className="modal fade" id="centermodal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-2">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myCenterModalLabel">Update Shift</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                {/* Shift Name */}
                                <div className="position-relative mb-3">
                                    <label className="form-label" htmlFor="shiftName">Shift Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.shiftName ? "is-invalid" : ""}`}
                                        id="shiftName"
                                        placeholder="Enter Shift Name"
                                        {...register("shiftName", { required: "Shift Name is required" })}
                                        disabled
                                    />
                                    {errors.shiftName && (
                                        <div className="invalid-tooltip" style={{ display: "block" }}>
                                            {errors.shiftName.message}
                                        </div>
                                    )}
                                </div>

                                {/* Shift Times */}
                                <label className="form-label">Shift Times</label>
                                {fields.map((item, index) => (
                                    <div key={item.id} className="d-flex mb-3">
                                        <Controller
                                            name={`shiftTimes.${index}.startTime`}
                                            control={control}
                                            rules={{ required: "Start time is required" }}
                                            render={({ field }) => (
                                                <input
                                                    type="time"
                                                    className={`form-control me-2 ${errors.shiftTimes?.[index]?.startTime ? "is-invalid" : ""}`}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.shiftTimes?.[index]?.startTime && (
                                            <div className="invalid-tooltip" style={{ display: "block" }}>
                                                {errors.shiftTimes[index]?.startTime?.message}
                                            </div>
                                        )}

                                        <Controller
                                            name={`shiftTimes.${index}.endTime`}
                                            control={control}
                                            rules={{ required: "End time is required" }}
                                            render={({ field }) => (
                                                <input
                                                    type="time"
                                                    className={`form-control me-2 ${errors.shiftTimes?.[index]?.endTime ? "is-invalid" : ""}`}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors.shiftTimes?.[index]?.endTime && (
                                            <div className="invalid-tooltip" style={{ display: "block" }}>
                                                {errors.shiftTimes[index]?.endTime?.message}
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            className="btn btn-soft-danger ms-2"
                                            onClick={() => remove(index)}
                                        ><i className="ri-delete-bin-line"></i></button>
                                    </div>
                                ))}

                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm rounded-pill mb-3"
                                        onClick={() => append({ startTime: "", endTime: "" })}
                                    >
                                        Add Time Slot
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button className="btn btn-lg btn-primary" type="submit">
                                    Update Shift
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateShiftModal;