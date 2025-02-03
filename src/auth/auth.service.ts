import { Body, Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { signUpInputDto, loginInputDto } from './dto';
import * as argon from 'argon2';
import { AuthHelper } from './helper/auth.helper';
@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private authHelper: AuthHelper
    ) { }

    async signup(
        @Body() dto: signUpInputDto,
    ) {
        const hash = await argon.hash(dto.password);
        const user = this.authHelper.creteUser(dto, hash);
        return user;
    }
    async login(
        @Body() dto: loginInputDto,
    ) {
        const user = await this.authHelper.validateUser(dto);
        return user;
    }
}
