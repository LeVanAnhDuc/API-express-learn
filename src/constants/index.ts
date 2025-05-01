import END_POINTS from './endpoint';
import { SUBJECT_EMAIL, TEMPLATE_EMAIL } from './email';

enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

const EXPIRE_TOKEN = {
  ACCESS_TOKEN: '8h',
  REFRESH_TOKEN: '7day',
  NUMBER_ACCESS_TOKEN: 8 * 60 * 60 * 1000,
  NUMBER_REFRESH_TOKEN: 7 * 24 * 60 * 60 * 1000,
};

const CONSTANTS = { EGender, ERole, END_POINTS, SUBJECT_EMAIL, TEMPLATE_EMAIL, EXPIRE_TOKEN };

export default CONSTANTS;
