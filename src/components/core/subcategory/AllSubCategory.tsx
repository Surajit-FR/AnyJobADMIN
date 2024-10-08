import React, { useEffect, useState } from "react";
import PageTitle from "../../PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
import { getAllSubCategoryRequest } from "../../../store/reducers/SubCategoryReducers";
import { TCategory } from "../../../../types/categoryTypes";
import { getAllCategoryRequest } from "../../../store/reducers/CategoryReducers";
import { getAllQuestionRequest } from "../../../store/reducers/QuestionReducers";
import QuestionAccordion from "./QuestionAccordion"; // Import the recursive component

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sub Category", link: "/service-sub-category" },
    { label: "All Sub Category" },
];

const AllSubCategory = (): JSX.Element => {
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);
    const { subCategoryData } = useSelector((state: RootState) => state.subCategorySlice);
    const { questionData } = useSelector((state: RootState) => state.questionSlice);

    const dispatch: AppDispatch = useDispatch();
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>("");

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryID(event.target.value);
    };

    const handleSubCategoryChange = (subCategoryId: string) => {
        dispatch(getAllQuestionRequest({
            subCategoryId,
            categoryId: selectedCategoryID || undefined,
        }));
    };

    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllSubCategoryRequest({
            categoryId: selectedCategoryID
        }));
    }, [dispatch, selectedCategoryID]);

    // Transform question data
    const transformedQuestionData = questionData?.map((question) => ({
        ...question,
        derivedQuestions: question.derivedQuestions || [], // Ensure derivedQuestions is always an array
    }));

    return (
        <>
            <PageTitle pageName="All Sub Category" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="header-title">Sub Category List</h4>
                            <p className="text-muted fs-14 mb-3">Click the sub-categories below to expand/collapse the sub-category content.</p>

                            <div className="accordion" id="accordionExample">
                                {subCategoryData?.map((subCategory, index) => (
                                    <div className="accordion-item" key={subCategory._id}>
                                        <h2 className="accordion-header" id={`heading${index}`}>
                                            <button
                                                className="accordion-button fw-medium collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${index}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse${index}`}
                                                onClick={() => handleSubCategoryChange(subCategory._id)}
                                            >
                                                {subCategory.name}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${index}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`heading${index}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                {/* Render questions if available */}
                                                {transformedQuestionData?.map((question) => (
                                                    <QuestionAccordion
                                                        key={question._id}
                                                        question={question.question}
                                                        options={question.options}
                                                        derivedQuestions={question.derivedQuestions}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-end">
                                                <button className="btn btn-sm btn-soft-warning m-1">Edit</button>
                                                <button className="btn btn-sm btn-soft-danger m-1">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-body">
                            <p className="mb-1 fw-bold text-muted">Single Category</p>
                            <p className="text-muted fs-14">Select category to filter...</p>

                            <select
                                className="form-control select2"
                                data-toggle="select2"
                                value={selectedCategoryID}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Select Category</option>
                                {categoryData &&
                                    categoryData.map((category: TCategory) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllSubCategory;