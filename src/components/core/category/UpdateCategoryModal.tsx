import { useRef, useEffect } from "react";
import { AppDispatch, RootState } from "../../../store/Store";
import { useForm } from "react-hook-form";
import { TCategoryPayload } from "../../../../types/categoryTypes";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryRequest } from "../../../store/reducers/CategoryReducers";

const UpdateCategoryModal = (): JSX.Element => {
    const { singleCategoryData } = useSelector((state: RootState) => state.categorySlice);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<TCategoryPayload>();
    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (data: TCategoryPayload): void => {
        const formData = new FormData();

        // Append category name
        formData.append("name", data.name);
        formData.append("serviceCost", data.serviceCost.toString());

        // Append the category image file if selected
        if (data.categoryImage instanceof File) {
            formData.append("categoryImage", data.categoryImage);
        };

        dispatch(updateCategoryRequest({ data: formData, reset, categoryId: singleCategoryData?._id }));
    };

    const handleDropzoneClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setValue("categoryImage", e.target.files[0]);
        }
    };

    useEffect(() => {
        if (singleCategoryData) {
            setValue("name", singleCategoryData?.name as string);
            if(singleCategoryData?.serviceCost){

                setValue("serviceCost", singleCategoryData?.serviceCost);
            }
            if (singleCategoryData?.categoryImage) {
                setValue("categoryImage", singleCategoryData?.categoryImage);
            }
        }
    }, [singleCategoryData, setValue]);


    return (
        <>
            <div className="modal fade" id="centermodal" tabIndex={-1} role="dialog"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myCenterModalLabel">Update Category</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="needs-validation p-2" noValidate>
                                {/* Category Name */}
                                <div className="position-relative mb-3">
                                    <label className="form-label" htmlFor="name">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        id="name"
                                        placeholder="Enter Category Name"
                                        {...register("name", {
                                            required: "Category Name is required",
                                        })}
                                    />
                                    {errors.name && (
                                        <div className="invalid-tooltip" style={{ display: "block" }}>
                                            {errors.name.message}
                                        </div>
                                    )}
                                </div>
                                {/* Category Cost */}
                                <div className="position-relative mb-3">
                                    <label className="form-label" htmlFor="name">
                                        Category Cost
                                    </label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.serviceCost ? "is-invalid" : ""}`}
                                        id="serviceCost"
                                        placeholder="Enter Category Cost"
                                        {...register("serviceCost", {
                                            required: "Service Cost is required",
                                        })}
                                    />
                                    {errors.serviceCost && (
                                        <div className="invalid-tooltip" style={{ display: "block" }}>
                                            {errors.serviceCost.message}
                                        </div>
                                    )}
                                </div>

                                {/* Dropzone for File Upload */}
                                <div className="form-group mb-3">
                                    <label className="form-label">Category Image</label>
                                    <div
                                        className="dropzone text-center p-3 border rounded"
                                        onClick={handleDropzoneClick}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="d-none"
                                            onChange={handleImageUpload}
                                        />
                                        {watch("categoryImage") ? (
                                            typeof watch("categoryImage") === "string" ? (
                                                <img
                                                    src={watch("categoryImage") as string}
                                                    alt="preview"
                                                    style={{ maxWidth: "100%", height: "auto" }}
                                                />
                                            ) : (
                                                <img
                                                    src={URL.createObjectURL(watch("categoryImage") as File)}
                                                    alt="preview"
                                                    style={{ maxWidth: "100%", height: "auto" }}
                                                />
                                            )
                                        ) : (
                                            <div className="dz-message">
                                                <i className="ri-upload-cloud-line h1"></i>
                                                <h5>Click to upload or drag image here</h5>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button className="btn btn-lg btn-primary" type="submit">
                                    Update Category
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateCategoryModal;