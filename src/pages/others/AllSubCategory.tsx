import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { deleteSubCategoryRequest, getAllSubCategoryRequest, getSubCategoryRequest } from "../../store/reducers/SubCategoryReducers";
import { TCategory } from "../../../types/categoryTypes";
import { getAllCategoryRequest } from "../../store/reducers/CategoryReducers";
import { getAllQuestionRequest } from "../../store/reducers/QuestionReducers";
import QuestionAccordion from "../../components/core/subcategory/QuestionAccordion"; // Import the recursive component
import ConfirmationModal from "../../components/ConfirmationModal";
import UpdateSubCategoryModal from "../../components/core/subcategory/UpdateSubCategoryModal";
import UpdateQuestionsModal from "../../components/core/subcategory/UpdateQuestionsModal";

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
    const [selectedSubCategoryID, setSelectedSubCategoryID] = useState<string>("");

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryID(event.target.value);
    };

    const handleSubCategoryChange = (subCategoryId: string) => {
        dispatch(getAllQuestionRequest({
            subCategoryId,
            categoryId: selectedCategoryID || undefined,
        }));
    };

    // Transform question data
    const transformedQuestionData = questionData?.map((question) => ({
        ...question,
        derivedQuestions: question.derivedQuestions || [], // Ensure derivedQuestions is always an array
    }));

    const handleCategoryDelete = () => {
        dispatch(deleteSubCategoryRequest({
            categoryId: selectedCategoryID,
            SubCategoryId: selectedSubCategoryID,
        }))
    };

    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllSubCategoryRequest({
            categoryId: selectedCategoryID
        }));
    }, [dispatch, selectedCategoryID]);


    return (
        <>
            {/* UpdateSubCategoryModal */}
            <UpdateSubCategoryModal />

            {/* UpdateQuestionsModal */}
            <UpdateQuestionsModal />

            {/* ConfirmationModal */}
            <ConfirmationModal
                modalId="delete-sub-modal"
                modalText={`Want To Delete This Sub Category?`}
                onDelete={handleCategoryDelete}
            />

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
                                                onClick={() => {
                                                    handleSubCategoryChange(subCategory._id);
                                                    setSelectedSubCategoryID(subCategory._id);
                                                }}
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
                                                        subCategoryId={selectedSubCategoryID}
                                                        questionId={question._id}
                                                        question={question.question}
                                                        options={question.options}
                                                        derivedQuestions={question.derivedQuestions}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-end">
                                                <button
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#subcatupdate-centermodal"
                                                    className="btn btn-sm btn-soft-warning m-1"
                                                    onClick={() => dispatch(getSubCategoryRequest({ SubCategoryId: subCategory?._id }))}
                                                >Edit</button>
                                                <button
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#delete-sub-modal"
                                                    className="btn btn-sm btn-soft-danger m-1"
                                                    onClick={() => setSelectedSubCategoryID(subCategory?._id)}
                                                >Delete</button>
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
                                <option value="">All</option>
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