import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface TokenState {
  token: string;
}
interface UserState {
  user: User;
}

interface SignInCredencials {
  email: string;
  password: string;
}

interface SignInMailCredencials {
  email: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredencials): Promise<void>;
  signInMail(email: SignInMailCredencials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [dataToken, setDataToken] = useState<TokenState>(() => {
    const token = localStorage.getItem('@Poligo:token');

    if (token) {
      return { token };
    }

    return {} as TokenState;
  });

  const [dataUser, setDataUser] = useState<UserState>(() => {
    const user = localStorage.getItem('@Poligo:user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as UserState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions-password', {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem('@Poligo:token', token);

    setDataToken({ token });
  }, []);

  const signInMail = useCallback(async ({ email }) => {
    const response = await api.post('/sessions-mail', {
      email,
    });

    const user = response.data;

    localStorage.setItem('@Poligo:user', JSON.stringify(user));

    setDataUser({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Poligo:token');
    localStorage.removeItem('@Poligo:user');

    setDataToken({} as TokenState);
    setDataUser({} as UserState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: dataUser.user,
        token: dataToken.token,
        signIn,
        signInMail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
