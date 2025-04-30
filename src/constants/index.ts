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

const CONSTANTS = { EGender, ERole, END_POINTS, SUBJECT_EMAIL, TEMPLATE_EMAIL };

export default CONSTANTS;
