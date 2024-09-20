import "datatables.net";

declare module 'datatables.net' {
    interface Config {
        responsive?: boolean;
        fixedHeader?: boolean;
        fixedColumns?: boolean;
        select?: boolean;
        buttons?: string[];
    }
}
