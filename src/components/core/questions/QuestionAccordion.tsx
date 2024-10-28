import { DerivedQuestion } from "../../../../types/subCategoryTypes";
import { getQuestionRequest } from "../../../store/reducers/QuestionReducers";
import { AppDispatch } from "../../../store/Store";
import { useDispatch } from "react-redux";

type QuestionProps = {
    categoryId: string | undefined;
    questionId: string | undefined;
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: Array<DerivedQuestion>;
    isDerived?: boolean;
    setItemID: (id: string) => void;
};

const sanitizeId = (id: string) => {
    return id.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

const QuestionAccordion = ({
    categoryId,
    questionId,
    question,
    options,
    derivedQuestions = [],
    isDerived = false,
    setItemID,
}: QuestionProps) => {
    const sanitizedQuestionId = sanitizeId(question);
    const dispatch: AppDispatch = useDispatch();

    const handleEditQuestion = () => {
        dispatch(getQuestionRequest({ categoryId, questionId }));
    };

    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`heading-${sanitizedQuestionId}`}>
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${sanitizedQuestionId}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${sanitizedQuestionId}`}
                    >
                        {question}
                    </button>
                </h2>
                <div
                    id={`collapse-${sanitizedQuestionId}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${sanitizedQuestionId}`}
                    data-bs-parent={`#accordionExample-${categoryId}`}
                >
                    <div className="accordion-body">
                        {!isDerived && (
                            <div className="text-end">
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#questionupdate-centermodal"
                                    className="btn btn-sm btn-soft-secondary me-2"
                                    onClick={handleEditQuestion}
                                >
                                    <i className="ri-edit-fill"></i>
                                </button>
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete-question-alert-modal"
                                    className="btn btn-sm btn-soft-danger"
                                    onClick={() => setItemID(questionId ?? "")}
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                            </div>
                        )}
                        <ul>
                            {Object.entries(options).map(([key, value]) => (
                                <li key={key}>
                                    {value}
                                </li>
                            ))}
                        </ul>
                        {derivedQuestions?.length > 0 && (
                            <div>
                                <h5>Derived Questions:</h5>
                                {derivedQuestions?.map((dq) => (
                                    <QuestionAccordion
                                        key={dq?._id}
                                        categoryId={categoryId}
                                        questionId={dq?._id}
                                        question={dq?.question}
                                        options={dq?.options}
                                        derivedQuestions={dq?.derivedQuestions as Array<DerivedQuestion>}
                                        isDerived={true}
                                        setItemID={setItemID}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestionAccordion;