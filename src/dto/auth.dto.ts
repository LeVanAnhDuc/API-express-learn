import { Expose, Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator';

export class CreateAccountDTO {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    @IsString()
    @Transform(({ value }) => (value ? value.trim() : value))
    userName: string;

    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    @IsEmail()
    @Transform(({ value }) => (value ? value.trim() : value))
    email: string;

    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    @IsMobilePhone('vi-VN')
    @Transform(({ value }) => (value ? value.trim() : value))
    phone: string;

    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    @IsString()
    @Transform(({ value }) => (value ? value.trim() : value))
    passWord: string;
}

export class LoginAccountDTO {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    @IsEmail()
    email: string;

    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    @IsString()
    passWord: string;
}
