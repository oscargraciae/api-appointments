import { verify } from 'argon2';

import { User } from "../entity/User"

export const auth = async (email: string, password: string): Promise<{ isAuth: boolean; user?: User | undefined; message?: string | undefined; }>  => {
  const user = await User.findOne({ email });

  if (!user) {
    return {
      isAuth: false,
      message: 'Email not found.'
    };
  }

  if (!await verify(user.password, password)) {
    return {
      isAuth: false,
      message: 'Incorrect password.'
    }
  }

  return {
    isAuth: true,
    user,
  };
}

