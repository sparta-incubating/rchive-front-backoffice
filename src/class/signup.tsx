import { GenderEnum, OAuthEnum, UserRoleEnum } from '@/types/signup.types';

export class SignupForm {
  oAuthType: OAuthEnum;
  email: string;
  password: string;
  birth: string;
  phone: string;
  gender: GenderEnum;
  nickname: string;
  userRole: UserRoleEnum;
  termUserAge: boolean;
  termUseService: boolean;
  termPersonalInfo: boolean;
  termAdvertisement: boolean;

  constructor(
    oAuthType: OAuthEnum,
    email: string,
    password: string,
    birth: string,
    phone: string,
    gender: GenderEnum,
    nickname: string,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
  ) {
    this.oAuthType = oAuthType;
    this.email = email;
    this.password = password;
    this.birth = birth;
    this.phone = phone;
    this.gender = gender;
    this.nickname = nickname;
    this.userRole = userRole;
    this.termUserAge = termUserAge;
    this.termUseService = termUseService;
    this.termPersonalInfo = termPersonalInfo;
    this.termAdvertisement = termAdvertisement;
  }
}
