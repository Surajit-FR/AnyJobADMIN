import React, { useState } from "react";
import { DerivedQuestion } from "../../../../types/subCategoryTypes";
import { getQuestionRequest } from "../../../store/reducers/QuestionReducers";
import { AppDispatch } from "../../../store/Store";
import { useDispatch } from "react-redux";

type QuestionProps = {
    subCategoryId: string | undefined;
    questionId: string | undefined;
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: Array<DerivedQuestion>;
    isDerived?: boolean; // New prop to track if it's a derived question
}

const sanitizeId = (id: string) => {
    return id
        .replace(/[^a-zA-Z0-9]/g, '-')
        .toLowerCase();
}

const QuestionAccordion = ({ subCategoryId, questionId, question, options, derivedQuestions = [], isDerived = false }: QuestionProps) => {
    const sanitizedQuestionId = sanitizeId(question);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch: AppDispatch = useDispatch();

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev); // Toggle the open state
    };


    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                        className="accordion-button"
                        type="button"
                        onClick={toggleAccordion}
                        aria-expanded={isOpen} // Indicate if it's expanded
                        aria-controls={`collapse-${sanitizedQuestionId}`} // Control the related content
                    >
                        {question}
                    </button>
                </h2>
                <div
                    id={`collapse-${sanitizedQuestionId}`}
                    className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`} // Use local state to show/hide
                    aria-labelledby={`heading-${sanitizedQuestionId}`} // Link to the header
                    data-bs-parent={false} // Prevent Bootstrap from managing parent-child relationship
                >
                    <div className="accordion-body">
                        {!isDerived && ( // Only show edit button if it's not a derived question
                            <div className="text-end">
                                <button
                                    data-bs-toggle="modal"
                                    data-bs-target="#questionupdate-centermodal"
                                    className="btn btn-sm btn-soft-secondary"
                                    onClick={() => dispatch(getQuestionRequest({ subCategoryId: subCategoryId, questionId: questionId }))}>
                                    <i className="ri-edit-fill"></i>
                                </button>
                            </div>
                        )}
                        <ul>
                            {Object.entries(options).map(([key, value]) => (
                                <li key={key}>
                                    {value}
                                    {derivedQuestions.length > 0 && (
                                        derivedQuestions.map((dq) => (
                                            <QuestionAccordion
                                                key={dq.option} // Use a unique key for each derived question
                                                subCategoryId={subCategoryId}
                                                questionId={dq._id}
                                                question={dq.question}
                                                options={dq.options}
                                                derivedQuestions={dq.derivedQuestions as Array<DerivedQuestion>}
                                                isDerived={true} // Pass isDerived as true for nested accordions
                                            />
                                        ))
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestionAccordion;