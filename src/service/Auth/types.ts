export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export interface SignUp{
  first_name: string;
  last_name: string;
  email: string;
  country_id: number;
  birth_date: string;
  gender: string;
  password: string;
}
export interface SignIn{
  username: string;
  password: string;
}
export interface Email{
  email: string;
}

