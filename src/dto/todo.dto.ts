import { Expose, Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsInt, Max, Min } from 'class-validator';

export class GetTodosQueryParamsDTO {
    @Expose()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Transform(({ value }) => value || 1)
    pageNo: number = 1;

    @Expose()
    @Type(() => Number)
    @IsInt()
    @Max(120)
    @Transform(({ value }) => value || 10)
    pageSize: number = 10;

    @Expose()
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => (typeof value === 'boolean' ? value : false))
    isStatus: boolean = true;
}

export class CreateTodoDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (value ? value.trim() : value))
    name: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (value ? value.trim() : value))
    description: string;
}

export class UpdateTodoDTO {
    @Expose()
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value ? value.trim() : value))
    name: string;

    @Expose()
    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value ? value.trim() : value))
    description: string;
}
