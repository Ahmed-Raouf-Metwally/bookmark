import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { signUpInputDto, loginInputDto } from "../dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon from 'argon2';

@Injectable()
export class AuthHelper {
    constructor(private prisma: PrismaService) { }

    async creteUser(dto: signUpInputDto, hash: string) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                },
            });
            delete user.password;
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Email already exists");
                }
                else {
                    throw error;
                }
            }
            else {
                throw error;
            }
        }
    }

    async validateUser(dto: loginInputDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) {
            throw new ForbiddenException("Invalid credentials");
        }
        const isValid = await this.comparePassword(user.password, dto.password);
        if (!isValid) {
            throw new ForbiddenException("Invalid credentials");
        }
        delete user.password;
        return user;
    }

    async comparePassword(hash: string, password: string) {
        return argon.verify(hash, password);
    }
}
