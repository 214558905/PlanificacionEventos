import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token != undefined) {
        try {
            const tokens:JwtPayload|null = jwt.verify(token, config.SECRET) as JwtPayload
            if(!(tokens.rol==='Administrador')){
                res.status(400).json({message: 'Acesso denegado'})
            }
            next()
        } catch (error) {
            res.status(400).json({message: 'Token no valido'})
        }
    }else{
        res.status(400).json({message: 'Acesso denegado'})
    }
  };

  export const decodeToken = (req: Request, res: Response) => {
    const tokens = req.headers.authorization;
    console.log(tokens)
    if (tokens) {
      try {
        const token: JwtPayload | null = jwt.verify(tokens, config.SECRET) as JwtPayload;
        res.json(token);
      } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
      }
    } else {
      res.status(400).json({ message: 'Acceso denegado' });
    }
  };