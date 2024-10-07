import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import PageTitle from "../../components/PageTitle";
import FileUpload from "../../components/core/subcategory/FileUpload";
import Question from "../../components/core/subcategory/Question";
import { Link } from "react-router-dom";
import { TCategory } from "../../../types/categoryTypes";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryRequest } from "../../store/reducers/CategoryReducers";
import { TSubCategoryPayload } from "../../../types/subCategoryTypes";
import { addSubCategoryRequest } from "../../store/reducers/SubCategoryReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sub Category" }
];

const SubCategoryPage = (): JSX.Element => {
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);
    const dispatch: AppDispatch = useDispatch();
    const [categoryStateData, setCategoryStateData] = useState<Array<TCategory>>();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { register, handleSubmit, control, setValue, watch, reset } = useForm<TSubCategoryPayload>({
        defaultValues: {
            name: "",
            subCategoryImage: null,
            categoryId: "",
            questionArray: []
            // questionArray: [{ question: "", options: {}, derivedQuestions: [] }]
        }
    });

    const { fields: questions, append, remove } = useFieldArray({
        control,
        name: "questionArray"
    });

    const handleFormSubmit = (data: TSubCategoryPayload) => {
        if (!data.categoryId) {
            alert("Please select a category.");
            return;
        }

        // Create a new FormData object
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("categoryId", data.categoryId);
        // Append the image file (if exists)
        if (data.subCategoryImage instanceof File) {
            formData.append("subCategoryImage", data.subCategoryImage);
        };
        formData.append("questionArray", JSON.stringify(data.questionArray));

        dispatch(addSubCategoryRequest({ data: formData, reset }));
    };

    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
    }, [dispatch]);

    useEffect(() => {
        setCategoryStateData(categoryData as Array<TCategory>);
    }, [categoryData]);


    return (
        <>
            <PageTitle pageName="Sub Category" breadcrumbs={breadcrumbs} />
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">Create Sub Category</h4>
                                <Link className="btn btn-dark" to="/all-sub-category">All Sub Category</Link>
                            </div>
                            <hr />

                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <div className="row">
                                    <div className="col-lg-4 pe-3 my-2">
                                        <div className="form-group mb-3">
                                            <label className="form-label" htmlFor="category-select">Select Category</label>
                                            <select
                                                id="category-select"
                                                className="form-select"
                                                {...register("categoryId")}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                {categoryStateData &&
                                                    categoryStateData?.map((category: TCategory) => (
                                                        <option key={category._id} value={category._id}>
                                                            {category.name}
                                                        </option>
                                                    ))
                                                }
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

                                        <FileUpload
                                            fileInputRef={fileInputRef}
                                            watch={watch}
                                            setValue={setValue}
                                        />
                                    </div>

                                    <div className="col-lg-8" style={{ marginTop: "39px" }}>
                                        <button type="button" className="btn btn-success mb-2" onClick={() => append({ question: "", options: {}, derivedQuestions: [] })}>
                                            Add Question
                                        </button>
                                        {questions.map((question, qIndex) => (
                                            <Question
                                                key={question.id}
                                                question={question}
                                                qIndex={qIndex}
                                                remove={remove}
                                                control={control}
                                                register={register}
                                                setValue={setValue}
                                                watch={watch}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg">Create Sub Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategoryPage;