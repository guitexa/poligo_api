import React, { createContext, useCallback, useState, useContext } from 'react';
import decode from 'jwt-decode';
import { fromUnixTime, isAfter } from 'date-fns';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Permission {
  id: string;
  name: string;
}

interface TokenState {
  token: string;
}

interface TokenDecode {
  exp: number;
  sub: string;
  typ: string;
}
interface UserState {
  user: User;
  permission: string;
}

interface SignInMailCredencials {
  email: string;
}

interface signInPasswordCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  userPermission: string;
  signInMail(email: SignInMailCredencials): Promise<void>;
  signInPassword(credentials: signInPasswordCredencials): Promise<void>;
  signOut(): void;
  checkToken(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [dataToken, setDataToken] = useState<TokenState>(() => {
    const token = localStorage.getItem('@Poligo:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token };
    }

    return {} as TokenState;
  });

  const [dataUser, setDataUser] = useState<UserState>({} as UserState);

  const signInMail = useCallback(
    async ({ email }) => {
      const response = await api.post('/sessions-mail', {
        email,
      });

      const user = response.data;

      setDataUser({ ...dataUser, user });
    },
    [dataUser]
  );

  const signInPassword = useCallback(
    async ({ email, password }) => {
      const response = await api.post('/sessions-password', {
        email,
        password,
      });

      const { token, permission } = response.data;

      localStorage.setItem('@Poligo:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setDataToken({ token });
      setDataUser({ ...dataUser, permission });
    },
    [dataUser]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Poligo:token');

    setDataToken({} as TokenState);
    setDataUser({} as UserState);
  }, []);

  const checkToken = useCallback(async () => {
    const userToken = decode(dataToken.token) as TokenDecode;

    const checkIfTokenIsExpired = isAfter(
      fromUnixTime(userToken.exp),
      new Date(Date.now())
    );

    if (!checkIfTokenIsExpired) {
      signOut();
    } else {
      const userResponse = await api.get<User[]>('/users');
      const permissionsResponse = await api.get<Permission[]>('/permissions');

      const user = userResponse.data.find((usr) => usr.id === userToken.sub);
      const permission = permissionsResponse.data.find(
        (perm) => perm.id === userToken.typ
      );

      if (user && permission) {
        setDataUser({ user, permission: permission?.name });
      }
    }
  }, [dataToken.token, signOut]);

  if (!dataUser.user && !!dataToken.token) {
    checkToken();
  }

  return (
    <AuthContext.Provider
      value={{
        user: dataUser.user,
        token: dataToken.token,
        userPermission: dataUser.permission,
        signInMail,
        signInPassword,
        signOut,
        checkToken,
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
