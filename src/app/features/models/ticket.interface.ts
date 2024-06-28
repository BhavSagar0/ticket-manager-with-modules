import { PriorityLevel } from "./priority-level.enum";

export interface Ticket{ 
    id?: string,
    UserId: string,
    Title: string,
    Description: string,
    PriorityLevel: PriorityLevel,
    DueDate: Date,
    InitialStatus: string
}