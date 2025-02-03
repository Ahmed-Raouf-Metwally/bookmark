import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "../dto";

@Injectable()
export class AuthHelper {
    constructor(private prisma: PrismaService) { }
    async creteUser(
        dto: AuthDto,
        hash: string
    ) {
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hash,
                firstName: dto.firstName,
                lastName: dto.lastName
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
}
