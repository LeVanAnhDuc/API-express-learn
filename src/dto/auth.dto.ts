import { Expose, Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsMobilePhone, MinLength, MaxLength } from 'class-validator';

export class CreateAccountDTO {
    // require field expose
    @Expose()
    @Transform(({ value }) => value?.trim())
    // convert to type
    // @Type(() => String)
    @IsNotEmpty()
    @IsString()
    userName: string;

    @Expose()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty()
    @IsMobilePhone('vi-VN')
    phone: string;

    @Expose()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty()
    @IsString()
    passWord: string;
}

export class LoginAccountDTO {
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    passWord: string;
}
