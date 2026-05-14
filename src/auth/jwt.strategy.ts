import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKeyProvider: passportJwtSecret({
                jwksUri: `${process.env.SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
                cache: true,
                rateLimit: true,
            }),
            algorithms: ['ES256'], // tell passport-jwt to expect ES256
        })
    }

    async validate(payload: any){
        return {
            id: payload.sub,
            email: payload.email,
        };
    }
}