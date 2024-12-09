import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import { useForm } from "react-hook-form";
import { AddAdminUserRequest } from "../../store/reducers/UserReducers";

export type AddAdminUserFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userType: string;
};

const AddAdminUser = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddAdminUserFormData>();

    const onSubmit = (data: AddAdminUserFormData): void => {
        dispatch(AddAdminUserRequest({ data, reset }));
    };

    return (
        <>
            <div className="modal fade" id="custom-modal" tabIndex={-1} aria-labelledby="customModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="customModalLabel">Add Admin User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="needs-validation p-2" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip01">First name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                                id="validationTooltip01"
                                                placeholder="First name"
                                                {...register("firstName", { required: "First name is required" })}
                                            />
                                            {errors.firstName && (
                                                <div className="invalid-tooltip" style={{ display: "block" }}>
                                                    {errors.firstName.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip02">Last name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                                id="validationTooltip02"
                                                placeholder="Last name"
                                                {...register("lastName", { required: "Last name is required" })}
                                            />
                                            {errors.lastName && (
                                                <div className="invalid-tooltip" style={{ display: "block" }}>
                                                    {errors.lastName.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip04">Email</label>
                                            <input
                                                type="email"
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                id="validationTooltip04"
                                                placeholder="Email"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Enter a valid email address",
                                                    },
                                                })}
                                            />
                                            {errors.email && (
                                                <div className="invalid-tooltip" style={{ display: "block" }}>
                                                    {errors.email.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip05">Phone</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                                id="validationTooltip05"
                                                placeholder="Phone"
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: "Enter a valid 10-digit phone number",
                                                    },
                                                })}
                                            />
                                            {errors.phone && (
                                                <div className="invalid-tooltip" style={{ display: "block" }}>
                                                    {errors.phone.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="position-relative mb-3">
                                            <label className="form-label" htmlFor="validationTooltip05">Single User Role</label>
                                            <select
                                                className={`form-control ${errors.userType ? "is-invalid" : ""}`}
                                                {...register("userType", { required: "User role is required" })}
                                            >
                                                <option value="">Select</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Finance">Finance</option>
                                            </select>
                                            {errors.userType && (
                                                <div className="invalid-tooltip" style={{ display: "block" }}>
                                                    {errors.userType.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAdminUser;