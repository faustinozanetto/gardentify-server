import { User } from '@prisma/client';
import { AuthProvider } from '../users/models/user.model';

export type UserDetails = {
  username: string;
  oauthId: string;
  avatar: string;
  authProvider: AuthProvider;
  accessToken: string;
  refreshToken: string;
};

export interface AuthenticationProvider {
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser(oauthId: string): Promise<User | undefined>;
}
