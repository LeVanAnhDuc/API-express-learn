import { Expose } from 'class-transformer';

export default class TodoDTO {
    name: string;

    description: string;

    isStatus: boolean;

    updatedAt: Date;

    constructor(name, description, isStatus, updatedAt) {
        this.name = name;
        this.description = description;
        this.isStatus = isStatus;
        this.updatedAt = updatedAt;
    }
}
