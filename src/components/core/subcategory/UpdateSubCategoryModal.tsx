import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AppDispatch, RootState } from "../../../store/Store";
import { getAllCategoryRequest } from "../../../store/reducers/CategoryReducers";
import { TCategory } from "../../../../types/categoryTypes";
import { TSubCategoryPayload } from "../../../../types/subCategoryTypes";
import FileUpload from "./FileUpload";
import { updateSubCategoryRequest } from "../../../store/reducers/SubCategoryReducers";

const UpdateSubCategoryModal = (): JSX.Element => {
    const { singleSubCategoryData } = useSelector((state: RootState) => state.subCategorySlice);
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);

    const dispatch: AppDispatch = useDispatch();
    const [categoryStateData, setCategoryStateData] = useState<Array<TCategory>>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Initialize form using react-hook-form
    const { register, handleSubmit, setValue, reset, watch } = useForm<TSubCategoryPayload>({
        defaultValues: {
            name: "",
            subCategoryImage: null,
            categoryId: ""
        }
    });

    // Form submit handler
    const handleFormSubmit = (data: TSubCategoryPayload) => {
        if (!data.categoryId) {
            alert("Please select a category.");
            return;
        }

        // Prepare FormData for file submission
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("categoryId", data.categoryId);

        // Handle file upload if there's a new file
        if (data.subCategoryImage instanceof File) {
            formData.append("subCategoryImage", data.subCategoryImage);
        }

        dispatch(updateSubCategoryRequest({
            data: formData,
            reset,
            categoryId: singleSubCategoryData?.categoryId?._id,
            SubCategoryId: singleSubCategoryData?._id
        }));
    };

    // Fetch categories when component mounts
    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
    }, [dispatch]);

    // Set categories data when it's updated
    useEffect(() => {
        if (categoryData) {
            setCategoryStateData(categoryData as Array<TCategory>);
        }
    }, [categoryData]);

    // Prefill the form with existing subcategory data when it changes
    useEffect(() => {
        if (singleSubCategoryData) {
            reset({
                name: singleSubCategoryData.name || "",
                categoryId: singleSubCategoryData.categoryId?._id || "",
                subCategoryImage: null // Clear file input
            });
        }
    }, [singleSubCategoryData, reset]);

    return (
        <>
            <div className="modal fade" id="subcatupdate-centermodal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myCenterModalLabel">Update Sub Category</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-3 py-2">
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="category-select">Select Category</label>
                                    <select
                                        id="category-select"
                                        className="form-select"
                                        {...register("categoryId")}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categoryStateData?.map((category: TCategory) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="subCategoryName">Sub Category Name</label>
                                    <input
                                        type="text"
                                        id="subCategoryName"
                                        className="form-control"
                                        placeholder="Enter Sub Category Name"
                                        {...register("name")}
                                    />
                                </div>

                                {/* File Upload Component */}
                                <FileUpload
                                    fileInputRef={fileInputRef}
                                    watch={watch}
                                    setValue={setValue}
                                />

                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary btn-lg">Update Sub Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateSubCategoryModal;