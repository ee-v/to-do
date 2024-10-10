import { DateFormat } from "src/app/shared/utils/date-format";
import { ITask } from "./task.interface";

export class Task {
    private _id: string;
    private _description: string;
    private _deadLine?: string;
    private _createdDate: string;
    private _updatedDate?: string;
    private _status: boolean;

    constructor(description: string, deadLine?: string) {
        this._id = Date.now().toString();
        this._description = description;
        if (deadLine !== undefined) {
            this._deadLine = deadLine;
        }
        this._createdDate = DateFormat.getLocaleDateFormatString();
        this._status = false;
    }

    get id(): string {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get deadLine(): string | undefined {
        return this._deadLine ? this._deadLine : undefined;
    }

    set deadLine(deadLine: string | undefined) {
        this._deadLine = deadLine ? deadLine : undefined;
    }

    get createdDate(): string {
        return this._createdDate;
    }

    get updatedDate(): string | undefined {
        return this._updatedDate ? this._updatedDate : undefined;
    }

    get status(): boolean {
        return this._status;
    }

    set status(status: boolean) {
        this._status = status;
    }

    get me(): ITask {
        return {
            id: this.id,
            description: this.description,
            deadLine: this.deadLine,
            createdDate: this.createdDate,
            updatedDate: this.updatedDate,
            status: this.status
        }
    }

    update(data: Task) {
        this.description = data.description;
        this.deadLine = data.deadLine;
        this.status = data.status;
        this._updatedDate = DateFormat.getLocaleDateFormatString();
    }

    static fromData(data: Task): Task {
        const task = new Task(data.description);
        task._id = data.id;
        task.description = data.description;
        task.deadLine = data.deadLine;
        task._createdDate = data.createdDate;
        task._updatedDate = data.updatedDate ? data.updatedDate : undefined;
        task.status = data.status;
        return task;
    }
}
