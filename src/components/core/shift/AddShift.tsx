import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useTimeFormat } from "../../../hooks/useTimeFormat";
import { AppDispatch } from "../../../store/Store";
import { useDispatch } from "react-redux";
import { addShiftRequest } from "../../../store/reducers/ShiftReducers";
import { TShiftPayload } from "../../../../types/shiftTypes";


const AddShift = (): JSX.Element => {
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

    const onSubmit = (data: TShiftPayload) => {
        // Format the shift times
        const formattedShiftTimes = data.shiftTimes.map(shift => ({
            startTime: convertTo12HourFormat(shift.startTime),
            endTime: convertTo12HourFormat(shift.endTime)
        }));

        const formattedData = {
            shiftName: data.shiftName,
            shiftTimes: formattedShiftTimes
        };
        dispatch(addShiftRequest({ data: formattedData, reset }));
    };

    return (
        <>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="header-title mb-3">Create Service Shift</h4>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            {/* Shift Name */}
                            <div className="position-relative mb-3">
                                <label className="form-label" htmlFor="shiftName">
                                    Shift Name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.shiftName ? "is-invalid" : ""}`}
                                    id="shiftName"
                                    placeholder="Enter Shift Name"
                                    {...register("shiftName", { required: "Shift Name is required" })}
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
                                                className={`form-control me-2 ${errors.shiftTimes?.[index]?.startTime ? "is-invalid" : ""
                                                    }`}
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
                                                className={`form-control me-2 ${errors.shiftTimes?.[index]?.endTime ? "is-invalid" : ""
                                                    }`}
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
                                Create Shift
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddShift;