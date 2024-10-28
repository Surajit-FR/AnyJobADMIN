import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { TCategory } from "../../../types/categoryTypes";
import { getAllCategoryRequest } from "../../store/reducers/CategoryReducers";
import { deleteQuestionRequest, getAllQuestionRequest } from "../../store/reducers/QuestionReducers";
import QuestionAccordion from "../../components/core/questions/QuestionAccordion";
import UpdateQuestionsModal from "../../components/core/questions/UpdateQuestionsModal";
import ConfirmationModal from "../../components/ConfirmationModal";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Service Questions", link: "/manage-service-questions" },
    { label: "All Questions" },
];

const AllQuestions = (): JSX.Element => {
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);
    const { questionData } = useSelector((state: RootState) => state.questionSlice);

    const dispatch: AppDispatch = useDispatch();
    const [selectedCategoryID, setSelectedCategoryID] = useState<string>("");
    const [itemId, setItemID] = useState<string>("");

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryID(event.target.value);
    };

    const handleDelete = () => {
        dispatch(deleteQuestionRequest({ questionId: itemId, categoryId: selectedCategoryID }))
    };

    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllQuestionRequest({
            categoryId: selectedCategoryID
        }));
    }, [dispatch, selectedCategoryID]);


    return (
        <>
            <ConfirmationModal
                modalId="delete-question-alert-modal"
                modalText={"Want To Delete The Question?"}
                onDelete={handleDelete}
            />

            {/* UpdateQuestionsModal */}
            <UpdateQuestionsModal />

            <PageTitle pageName="All Questions" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="header-title">Category List With Their Coresponding Questions</h4>
                            <p className="text-muted fs-14 mb-3">Click the categories below to expand/collapse the content.</p>

                            <div className="accordion" id="accordionExample">
                                {questionData?.map((category, index) => (
                                    <div className="accordion-item" key={category?._id}>
                                        <h2 className="accordion-header" id={`heading${index}`}>
                                            <button
                                                className="accordion-button fw-medium collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${index}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse${index}`}
                                                onClick={() => dispatch(getAllQuestionRequest({ categoryId: selectedCategoryID || undefined }))}
                                            >
                                                {category?.name}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${index}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`heading${index}`}
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                {category?.questions?.map((question: any) => (
                                                    <QuestionAccordion
                                                        key={question?._id}
                                                        categoryId={selectedCategoryID ? selectedCategoryID : category?._id}
                                                        questionId={question?._id}
                                                        question={question?.question}
                                                        options={question?.options}
                                                        derivedQuestions={question?.derivedQuestions}
                                                        setItemID={setItemID}
                                                    />
                                                ))}
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
                                        <option key={category?._id} value={category?._id}>
                                            {category?.name}
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

export default AllQuestions;