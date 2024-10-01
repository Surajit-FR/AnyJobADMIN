export type DerivedQuestion = {
    option: string;
    question: string;
    options: { [key: string]: string }; // Change to an object
    derivedQuestions: DerivedQuestion[];
};

const DerivedQuestionComponent = ({
    derivedQuestion,
    questionIndex,
    derivedQuestionIndex,
    addDerivedQuestion,
    handleDerivedQuestionInputChange,
}: {
    derivedQuestion: DerivedQuestion;
    questionIndex: number;
    derivedQuestionIndex: number;
    addDerivedQuestion: (qIndex: number, optionIndex?: number) => void;
    handleDerivedQuestionInputChange: (qIndex: number, field: string, value: any) => void;
}) => {
    const handleDerivedOptionChange = (index: number, value: string) => {
        const updatedDerivedQuestion = { ...derivedQuestion };
        updatedDerivedQuestion.options[index] = value;

        handleDerivedQuestionInputChange(questionIndex, `derivedQuestions[${derivedQuestionIndex}]`, updatedDerivedQuestion);
    };

    const addDerivedOption = () => {
        const updatedDerivedQuestion = { ...derivedQuestion };
        const newOptionKey = `Option ${updatedDerivedQuestion.options.length + 1}`; // Create a new option key
        updatedDerivedQuestion.options[newOptionKey] = ''; // Initialize with an empty string

        handleDerivedQuestionInputChange(questionIndex, `derivedQuestions[${derivedQuestionIndex}]`, updatedDerivedQuestion);
    };

    return (
        <>
            <div className="mb-3">
                <label className="form-label">Derived Question</label>
                <input
                    type="text"
                    className="form-control mb-2"
                    value={derivedQuestion.question}
                    onChange={(e) =>
                        handleDerivedQuestionInputChange(
                            questionIndex,
                            `derivedQuestions[${derivedQuestionIndex}].question`,
                            e.target.value
                        )
                    }
                    placeholder="Enter Derived Question"
                />

                <div className="mb-2">
                    <label className="form-label me-2">Options</label>
                    {Object.entries(derivedQuestion.options).map(([key, option], oIndex) => (
                        <div key={oIndex} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                            />
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={option}
                                placeholder={`Option ${key}`} // Use the key for the placeholder
                                onChange={(e) => handleDerivedOptionChange(oIndex, e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={addDerivedOption}
                    >
                        Add Option
                    </button>
                </div>

                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => addDerivedQuestion(questionIndex, derivedQuestionIndex)}
                >
                    Add Derived Question
                </button>

                {/* Render nested derived questions recursively */}
                {derivedQuestion.derivedQuestions && (
                    <div className="ms-4">
                        {derivedQuestion.derivedQuestions.map((nestedDerived, nIndex) => (
                            <DerivedQuestionComponent
                                key={nIndex}
                                derivedQuestion={nestedDerived}
                                questionIndex={questionIndex}
                                derivedQuestionIndex={nIndex}
                                addDerivedQuestion={addDerivedQuestion}
                                handleDerivedQuestionInputChange={handleDerivedQuestionInputChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default DerivedQuestionComponent;