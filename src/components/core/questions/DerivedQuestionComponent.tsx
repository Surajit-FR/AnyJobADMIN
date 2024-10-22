import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TQuestionPayload } from "../../../../types/questionTypes";
import { useState } from "react";

type DerivedQuestionProps = {
    qIndex: number;
    dIndex: number;
    setValue: UseFormSetValue<TQuestionPayload>;
    watch: UseFormWatch<TQuestionPayload>;
    register: UseFormRegister<TQuestionPayload>;
}

const DerivedQuestionComponent = ({ qIndex, dIndex, setValue, watch, register }: DerivedQuestionProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // Toggle collapse state for derived questions
    };

    const addDerivedOption = () => {
        const derivedOptionKey = String.fromCharCode(65 + Object.keys(watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) || {}).length); // Auto-assign option key (A, B, C...)
        const derivedOptionLabel = prompt("Enter derived question option label:");
        if (derivedOptionLabel) {
            const derivedOptions = { ...watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) };
            derivedOptions[derivedOptionKey] = derivedOptionLabel;
            setValue(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`, derivedOptions);
        }
    };

    const removeDerivedOption = (optionKey: string) => {
        const derivedOptions = { ...watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) };
        delete derivedOptions[optionKey];
        setValue(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`, derivedOptions);
    };

    return (
        <>
            <div className="mt-4" style={{ marginLeft: "20px", padding: "10px", border: "1px solid #464f5b", borderRadius: "5px" }}>
                {/* Header for derived question with collapse button */}
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Derived Question for Option {watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.option`)}</h5>
                    <button type="button" className="btn btn-sm btn-secondary" onClick={toggleCollapse}>
                        {isCollapsed ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}
                    </button>
                </div>

                {/* Collapsible content for derived question */}
                {!isCollapsed && (
                    <>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Derived Question"
                                {...register(`questionArray.${qIndex}.derivedQuestions.${dIndex}.question`)}
                                style={{ width: "50%", marginRight: "20px" }}
                            />
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-info me-2"
                                onClick={addDerivedOption}
                            >
                                Add Derived Option
                            </button>
                        </div>

                        {Object.entries(watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) || {}).map(([optionKey]) => (
                            <div className="mt-2" key={optionKey}>
                                <span>{optionKey}: {watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options.${optionKey}`)}</span>
                                <button type="button" className="btn btn-sm btn-outline-danger mx-2" onClick={() => removeDerivedOption(optionKey)}>
                                    <i className="ri-delete-bin-5-fill"></i>
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default DerivedQuestionComponent;