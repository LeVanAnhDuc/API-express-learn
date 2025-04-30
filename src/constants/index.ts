import END_POINTS from './endpoint';

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

const CONSTANTS = { EGender, ERole, END_POINTS };

export default CONSTANTS;
