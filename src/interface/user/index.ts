import { IUser } from '../../models/user.model';

export interface IUserSpecifically
    extends Pick<IUser, 'userName' | 'fullName' | 'email' | 'isActive' | 'phone' | 'avatar'> {}
