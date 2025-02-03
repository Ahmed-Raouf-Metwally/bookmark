import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthHelper } from "./helper/auth.helper";

@Module({
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        AuthHelper
    ],
})
export class AuthModule { }
