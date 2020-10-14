interface IAuthenticationResult {
  token: string;
  error: {
    email: string;
    password?: string;
  };
}

export interface IAuthenticationServiceSignupInput {
  firstName: string;
  lastName: string;
  nationality: string;
  email: string;
  birthDate: Date;
  sex: string;
  password: string;
}

export interface IAuthenticationServiceSignupResult
  extends IAuthenticationResult {}

export interface IAuthenticationServiceSignInInput {
  email: string;
  password: string;
}

export interface IAuthenticationServiceSignInResult
  extends IAuthenticationResult {}
