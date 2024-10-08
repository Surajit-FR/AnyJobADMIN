import React, { useState } from "react";
import { DerivedQuestion } from "../../../../types/subCategoryTypes";

type QuestionProps = {
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: Array<DerivedQuestion>;
}

const sanitizeId = (id: string) => {
    return id
        .replace(/[^a-zA-Z0-9]/g, '-')
        .toLowerCase();
}

const QuestionAccordion = ({ question, options, derivedQuestions = [] }: QuestionProps) => {
    const sanitizedQuestionId = sanitizeId(question);
    const [isOpen, setIsOpen] = useState(false);

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
                        <ul>
                            {Object.entries(options).map(([key, value]) => (
                                <li key={key}>
                                    {value}
                                    {derivedQuestions.length > 0 && (
                                        derivedQuestions.map((dq) => (
                                            <QuestionAccordion
                                                key={dq.option} // Use a unique key for each derived question
                                                question={dq.question}
                                                options={dq.options}
                                                derivedQuestions={dq.derivedQuestions as Array<DerivedQuestion>}
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