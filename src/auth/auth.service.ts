import { Body, Injectable, Req } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) { }

    signup(
        @Body() dto: AuthDto,
    ) {
        return {
            message: 'signup'
        };
    }
    login(
        @Body() dto: AuthDto,
    ) {
        return {
            message: 'login'
        };
    }


}
