export interface Task {
  _id: string;
  userId: string;
  name: string;
  startingTime: string;
  dueTime: string;
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface SignIn extends Login {
  name: string;
  passwordCheck: string;
}

export interface TokenData {
  _id: string;
  name: string;
  email: string;
}
