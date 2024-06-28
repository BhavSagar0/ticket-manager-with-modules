export enum PriorityFilter{
    Low = 1,
    Medium = 2,
    High = 3
}

type PriorityFilterName = keyof typeof PriorityFilter;

export const priorityFilterNames = Object.values(PriorityFilter)
    .filter(x => typeof x !== "number") as PriorityFilter[];

    export const priorityFilterValues = Object.values(PriorityFilter)
    .filter(x => typeof x !== "string") as PriorityFilter[];