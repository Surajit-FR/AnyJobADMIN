export type DefaultSettings = {
    'data-layout-mode': string;
    'data-bs-theme': string;
    'data-menu-color': string;
    'data-topbar-color': string;
    'data-layout-position': string;
    'data-sidenav-size': string;
    'data-sidenav-user': string;
};

export type MenuItems = {
    title?: string;
    label?: string;
    to?: string;
    icon?: string;
    isSubmenu?: boolean;
    items?: Array<MenuItems>;
};

export type DerivedQuestion = {
    option: string;
    question: string;
    options: { [key: string]: string };
    derivedQuestions: Array<DerivedQuestion>;
};

export type Question = {
    question: string;
    options: { [key: string]: string };
    derivedQuestions: Array<DerivedQuestion>;
};

export type SubCategory = {
    categoryId: string;
    name: string;
    image: File | null;
    questionArray: Array<Question>;
};

export type Category = {
    id: string;
    name: string;
};