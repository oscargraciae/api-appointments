import { verify } from 'argon2';

import { User } from "../entity/User"

export const auth = async (email: string, password: string): Promise<{ isAuth: boolean; user?: User | undefined; message?: string | undefined; }>  => {
  const user = await User.findOne({ email }, { select: ['id', 'email', 'password'] })

  if (!user) {
    return {
      isAuth: false,
      message: 'No pudimos encontrar una cuenta con el correo electrónico que ingresaste.'
    };
  }

  if (!await verify(user.password, password)) {
    return {
      isAuth: false,
      message: 'La contraseña que ingresaste es incorrecta.'
    }
  }

  console.log('Todo correcto');

  return {
    isAuth: true,
    user,
  };
}

