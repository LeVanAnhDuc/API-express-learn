import { Expose } from 'class-transformer';

export default class TodoDTO {
    // @Expose() name;

    // @Expose() description;

    // @Expose() isStatus;

    // @Expose() updatedAt;

    constructor(name, description, isStatus, updatedAt) {
        this.name = name;
        this.description = description;
        this.isStatus = isStatus;
        this.updatedAt = updatedAt;
    }
}
