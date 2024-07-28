import { GenderEnum, OAuthEnum, UserRoleEnum } from '@/types/signup.types';

class SignupUserForm {
  oAuthType: OAuthEnum;
  email: string;
  password: string;
  birth: string;
  phone: string;
  gender: GenderEnum;
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
    this.userRole = userRole;
    this.termUserAge = termUserAge;
    this.termUseService = termUseService;
    this.termPersonalInfo = termPersonalInfo;
    this.termAdvertisement = termAdvertisement;
  }
}

export class Admin extends SignupUserForm {
  constructor(
    oAuthType: OAuthEnum,
    email: string,
    password: string,
    birth: string,
    phone: string,
    gender: GenderEnum,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
  ) {
    super(
      oAuthType,
      email,
      password,
      birth,
      phone,
      gender,
      userRole,
      termUserAge,
      termUseService,
      termPersonalInfo,
      termAdvertisement,
    );
  }
}

export class User extends SignupUserForm {
  nickname: string;

  constructor(
    oAuthType: OAuthEnum,
    email: string,
    password: string,
    birth: string,
    phone: string,
    gender: GenderEnum,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
    nickname: string,
  ) {
    super(
      oAuthType,
      email,
      password,
      birth,
      phone,
      gender,
      userRole,
      termUserAge,
      termUseService,
      termPersonalInfo,
      termAdvertisement,
    );
    this.nickname = nickname;
  }
}