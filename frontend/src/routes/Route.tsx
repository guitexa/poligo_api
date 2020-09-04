import React from 'react';
import {
  Route as RouteDOM,
  RouteProps as RouteDOMProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends RouteDOMProps {
  isPrivate?: boolean;
  isMailFilled?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isMailFilled = false,
  component: Component,
  ...rest
}) => {
  const { token, user } = useAuth();

  return (
    <RouteDOM
      {...rest}
      render={({ location }) => {
        return isPrivate === (!!user && !!token) &&
          isMailFilled === (!!user && !token) ? (
          // eslint-disable-next-line react/jsx-indent
          <Component />
        ) : (
          <Redirect
            to={{
              // eslint-disable-next-line no-nested-ternary
              pathname: isPrivate
                ? '/'
                : isMailFilled
                ? '/Comercial'
                : '/Login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
