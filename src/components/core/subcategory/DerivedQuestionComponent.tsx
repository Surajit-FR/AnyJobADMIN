import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TSubCategoryPayload } from "../../../../types/subCategoryTypes";

type DerivedQuestionProps = {
    qIndex: number;
    dIndex: number;
    setValue: UseFormSetValue<TSubCategoryPayload>;
    watch: UseFormWatch<TSubCategoryPayload>;
    register: UseFormRegister<TSubCategoryPayload>;
}

const DerivedQuestionComponent = ({ qIndex, dIndex, setValue, watch, register }: DerivedQuestionProps) => {
    const addDerivedOption = () => {
        const derivedOptionKey = prompt("Enter derived question option key (e.g., A, B):");
        const derivedOptionLabel = prompt("Enter derived question option label:");
        if (derivedOptionKey && derivedOptionLabel) {
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
            <div className="mt-4" style={{ marginLeft: "20px" }}>
                <h5>Derived Question for Option {watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.option`)}</h5>
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

                {Object.entries(watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`)).map(([optionKey]) => (
                    <div className="mt-2" key={optionKey}>
                        <span>{optionKey}: {watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options.${optionKey}`)}</span>
                        <button type="button" className="btn btn-sm btn-outline-danger mx-2" onClick={() => removeDerivedOption(optionKey)}>
                            <i className="ri-delete-bin-5-fill"></i>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DerivedQuestionComponent;