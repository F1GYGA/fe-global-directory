import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  authorities: string[];
  sub: string;
  iat: number;
  exp: number;

  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decodeToken(token: string): DecodedToken {
    return jwt_decode(token);
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: DecodedToken = this.decodeToken(token);
    return decodedToken.exp < Date.now() / 1000;
  }
}
