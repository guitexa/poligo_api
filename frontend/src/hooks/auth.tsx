import React, { createContext, useCallback, useState, useContext } from 'react';
import decode from 'jwt-decode';
import { fromUnixTime, isAfter } from 'date-fns';

import api from '../services/api';

interface Permissions {
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  permissions: Permissions;
}

interface TokenDecode {
  exp: number;
  sub: string;
  typ: string;
}

interface SignInMailCredencials {
  email: string;
}

interface SignInPasswordCredencials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signInMail(email: SignInMailCredencials): Promise<void>;
  signInPassword(credentials: SignInPasswordCredencials): Promise<void>;
  signOut(): void;
  checkToken(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(() => {
    const getToken = localStorage.getItem('@Poligo:token');

    if (getToken) {
      api.defaults.headers.authorization = `Bearer ${getToken}`;

      return getToken;
    }

    return '';
  });

  const [user, setUser] = useState<User>({
    email: '',
    id: '',
    name: '',
    permissions: {
      name: '',
    },
  });

  const signInMail = useCallback(async ({ email }) => {
    const response = await api.post('/sessions-mail', {
      email,
    });

    setUser(response.data);
  }, []);

  const signInPassword = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions-password', {
      email,
      password,
    });

    localStorage.setItem('@Poligo:token', response.data.token);

    api.defaults.headers.authorization = `Bearer ${response.data.token}`;

    setToken(response.data.token);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Poligo:token');

    setToken('');
    setUser({} as User);
  }, []);

  const checkToken = useCallback(async () => {
    const userToken = decode(token) as TokenDecode;

    const checkIfTokenIsExpired = isAfter(
      fromUnixTime(userToken.exp),
      new Date(Date.now())
    );

    if (!checkIfTokenIsExpired) {
      signOut();
    } else {
      const userResponse = await api.get<User[]>('/users');

      const findUser = userResponse.data.find(
        (usr) => usr.id === userToken.sub
      );

      if (findUser) {
        setUser(findUser);
      }
    }
  }, [token, signOut, setUser]);

  if (!user.id && !!token) {
    checkToken();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
