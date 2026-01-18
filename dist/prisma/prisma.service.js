"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        let databaseUrl = process.env.DATABASE_URL || '';
        if (databaseUrl.includes(':6543') || databaseUrl.includes('pooler')) {
            const url = new URL(databaseUrl);
            url.searchParams.set('pgbouncer', 'true');
            url.searchParams.set('connect_timeout', '10');
            databaseUrl = url.toString();
        }
        super({
            log: ['error', 'warn'],
            errorFormat: 'pretty',
            datasources: {
                db: {
                    url: databaseUrl,
                },
            },
            ...(databaseUrl.includes(':6543') || databaseUrl.includes('pooler') ? {
                __internal: {
                    engine: {
                        connectTimeout: 10000,
                    },
                },
            } : {}),
        });
        this.logger = new common_1.Logger(PrismaService_1.name);
    }
    async onModuleInit() {
        try {
            let retries = 3;
            let delay = 1000;
            while (retries > 0) {
                try {
                    await this.$connect();
                    this.logger.log('Database connected successfully');
                    return;
                }
                catch (error) {
                    retries--;
                    if (retries === 0) {
                        this.logger.error('Failed to connect to database after retries', error);
                        this.logger.error('Please check your DATABASE_URL in .env file');
                        this.logger.error('Make sure you are using the correct connection string from Supabase');
                        return;
                    }
                    this.logger.warn(`Database connection failed, retrying in ${delay}ms... (${retries} retries left)`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                }
            }
        }
        catch (error) {
            this.logger.error('Failed to connect to database', error);
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Database disconnected');
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map