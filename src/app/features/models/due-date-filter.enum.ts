export enum DueDateFilter{
    "Within Next Week" = 1,
    "Within Next Month" = 2,
    "Custom Date Range" = 3
}


type DueDateFilterName = keyof typeof DueDateFilter;

export const dueDateFilterNames = Object.values(DueDateFilter)
    .filter(x => typeof x !== "number") as DueDateFilter[];

    export const dueDateFilterValues = Object.values(DueDateFilter)
    .filter(x => typeof x !== "string") as DueDateFilter[];