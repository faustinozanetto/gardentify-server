import { AuthProvider as PrismaAuthType } from '@prisma/client';
import { AuthProvider } from '../modules/users/models/user.model';

export const parseUserAuthProvider = (type: PrismaAuthType): AuthProvider => {
  let parsedType: AuthProvider = AuthProvider.DEFAULT;

  // Parse enum type to the one in the plant model.
  Object.values(AuthProvider).forEach((stype: string) => {
    if (type === stype) {
      parsedType = stype as AuthProvider;
    }
  });

  return parsedType;
};
