import { TCategory } from "./categoryTypes";

export type DerivedQuestion = {
    option: string;
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: Array<Record<string, unknown>>;
    _id?: string;
};

export type TQuestion = {
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: Array<DerivedQuestion>;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
};

export type TQuestionPayload = {
    categoryId: string;
    questionArray?: Array<TQuestion>;
};

export type QuestionRespone = {
    _id: string;
    name: string;
    categoryImage: string;
    owner: string;
    questions: Array<TQuestion>;
}

// API response structure
export type TQuestionAPIResponse = {
    data: Array<QuestionRespone>;
};