export type LoginResponse = {
  token: string;
  refreshToken: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    photoUrl: string | null;
  };
};
