// Middleware de validação do JWT

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayLoad {
  exp: number; // Data de expiração
  sub: string; // ID do usuário
}

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  // Se o token existe faz a validação
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayLoad;

    req.user = {
      id: sub,
    };
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }

  return next();
}
