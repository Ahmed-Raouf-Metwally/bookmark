import { Body, Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { AuthHelper } from './helper/auth.helper';
import { stat } from 'fs';
@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private authHelper: AuthHelper
    ) { }

    async signup(
        @Body() dto: AuthDto,
    ) {
        const hash = await argon2.hash(dto.password);
        const user = this.authHelper.creteUser(dto, hash);
        return user;
    }
    login(
        @Body() dto: AuthDto,
    ) {
        return {
            message: 'login'
        };
    }


}
