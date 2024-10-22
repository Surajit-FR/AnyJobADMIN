import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import PageTitle from "../../components/PageTitle";
import Question from "../../components/core/questions/Question";
import { Link } from "react-router-dom";
import { TCategory } from "../../../types/categoryTypes";
import { AppDispatch, RootState } from "../../store/Store";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryRequest } from "../../store/reducers/CategoryReducers";
import { TAddQuestionPayload } from "../../../types/questionTypes";
import { addQuestionRequest } from "../../store/reducers/QuestionReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Questions" }
];

const ServiceQuestionPage = (): JSX.Element => {
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);
    const dispatch: AppDispatch = useDispatch();
    const [categoryStateData, setCategoryStateData] = useState<Array<TCategory>>();

    const { register, handleSubmit, control, setValue, watch, reset } = useForm<TAddQuestionPayload>({
        defaultValues: {
            categoryId: "",
            questionArray: []
            // questionArray: [{ question: "", options: {}, derivedQuestions: [] }]
        }
    });

    const { fields: questions, append, remove } = useFieldArray({
        control,
        name: "questionArray"
    });

    const handleFormSubmit = (data: TAddQuestionPayload) => {
        if (!data.categoryId) {
            alert("Please select a category.");
            return;
        };
        dispatch(addQuestionRequest({ data, reset }));
    };

    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
    }, [dispatch]);

    useEffect(() => {
        setCategoryStateData(categoryData as Array<TCategory>);
    }, [categoryData]);


    return (
        <>
            <PageTitle pageName="Service Questions" breadcrumbs={breadcrumbs} />
            <div className="row">
                <div className="col-lg-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">Create Question</h4>
                                <Link className="btn btn-dark" to="/all-sub-category">All Questions</Link>
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
                                    </div>

                                    <div className="col-lg-8" style={{ marginTop: "39px" }}>
                                        <button type="button" className="btn btn-success mb-2" onClick={() => append({ question: "", options: {}, derivedQuestions: [] })}>
                                            Add Question
                                        </button>
                                        {questions?.map((question, qIndex) => (
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
                                <button type="submit" className="btn btn-primary btn-lg">Add Questions</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceQuestionPage;