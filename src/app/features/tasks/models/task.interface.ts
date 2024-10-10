export interface ITask {
    id: string;
    description: string;
    deadLine?: string;
    createdDate: string;
    updatedDate?: string;
    status: boolean;
}
