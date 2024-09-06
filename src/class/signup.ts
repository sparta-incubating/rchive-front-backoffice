import { GenderEnum, OAuthEnum, UserRoleEnum } from '@/types/signup.types';

class SignupUserForm {
  oAuthType: OAuthEnum;
  email: string;
  username: string;
  password: string;
  birth: string;
  phone: string;
  nickname: string;
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
    gender: GenderEnum,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
    nickname: string,
    profileImg: string,
  ) {
    this.oAuthType = oAuthType;
    this.email = email;
    this.username = username;
    this.password = password;
    this.birth = birth;
    this.phone = phone;
    this.gender = gender;
    this.userRole = userRole;
    this.termUserAge = termUserAge;
    this.termUseService = termUseService;
    this.termPersonalInfo = termPersonalInfo;
    this.termAdvertisement = termAdvertisement;
    this.profileImg = profileImg;
    this.nickname = nickname;
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
    gender: GenderEnum,
    userRole: UserRoleEnum,
    termUserAge: boolean,
    termUseService: boolean,
    termPersonalInfo: boolean,
    termAdvertisement: boolean,
    profileImg: string,
    nickname: string,
  ) {
    super(
      oAuthType,
      email,
      username,
      password,
      birth,
      phone,
      gender,
      userRole,
      termUserAge,
      termUseService,
      termPersonalInfo,
      termAdvertisement,
      profileImg,
      nickname,
    );
  }
}

export class User extends SignupUserForm {
  nickname: string;

  constructor(
    oAuthType: OAuthEnum,
    email: string,
    username: string,
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
    profileImg: string,
  ) {
    super(
      oAuthType,
      email,
      username,
      password,
      birth,
      phone,
      gender,
      userRole,
      termUserAge,
      termUseService,
      termPersonalInfo,
      termAdvertisement,
      profileImg,
      nickname,
    );
    this.nickname = nickname;
  }
}
