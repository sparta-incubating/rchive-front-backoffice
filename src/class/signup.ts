import { GenderEnum, OAuthEnum, UserRoleEnum } from '@/types/signup.types';

class SignupUserForm {
  oAuthType: OAuthEnum;
  email: string;
  username: string;
  password: string;
  birth: string;
  phone: string;
  profileImg: string;
  gender: GenderEnum;
  userRole: UserRoleEnum;
  termUserAge: boolean;
  termUseService: boolean;
  termPersonalInfo: boolean;
  termAdvertisement: boolean;

  constructor(
    oAuthType: OAuthEnum,
    email: string,
    username: string,
    password: string,
    birth: string,
    phone: string,
    profileImg: string,
    gender: GenderEnum,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
  ) {
    this.oAuthType = oAuthType;
    this.email = email;
    this.username = username;
    this.password = password;
    this.birth = birth;
    this.phone = phone;
    this.profileImg = profileImg;
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
    username: string,
    password: string,
    birth: string,
    phone: string,
    profileImg: string,
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
      username,
      password,
      birth,
      phone,
      profileImg,
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
  constructor(
    oAuthType: OAuthEnum,
    email: string,
    username: string,
    password: string,
    birth: string,
    phone: string,
    profileImg: string,
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
      username,
      password,
      birth,
      phone,
      profileImg,
      gender,
      userRole,
      termUserAge,
      termUseService,
      termPersonalInfo,
      termAdvertisement,
    );
  }
}
