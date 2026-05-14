import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JWTStrategy } from "./jwt.strategy";


@Module({
    imports: [
         PassportModule
    ],
    providers: [
        JWTStrategy
    ],
    exports: [
        PassportModule
    ]
})

export class AuthModule{}