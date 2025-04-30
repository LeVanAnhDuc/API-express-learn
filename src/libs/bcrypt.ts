import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = (password: string) => bcrypt.hashSync(password, saltOrRounds);

export const isValidPassword = (password: string, hash: string) => bcrypt.compareSync(password, hash);
