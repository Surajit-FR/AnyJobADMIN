import { TCategory } from "./categoryTypes";
import { DerivedQuestion, TSubCategory } from "./subCategoryTypes";


export type TQuestion = {
    _id: string;
    categoryId: TCategory;
    subCategoryId: TSubCategory;
    question: string;
    options: Record<string, string>;
    derivedQuestions: Array<DerivedQuestion>;
};


export type TQuestionAPIResponse = {
    data: Array<TQuestion>;
}