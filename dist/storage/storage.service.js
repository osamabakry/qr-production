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
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = null;
        this.logger = new common_1.Logger(StorageService_1.name);
        const accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
        this.useLocalStorage = !accessKeyId || !secretAccessKey;
        if (!this.useLocalStorage) {
            try {
                this.s3 = new AWS.S3({
                    accessKeyId,
                    secretAccessKey,
                    region: this.configService.get('AWS_REGION') || 'us-east-1',
                });
                this.bucket = this.configService.get('AWS_S3_BUCKET') || 'qr-menu-images';
                this.logger.log('Using AWS S3 for file storage');
            }
            catch (error) {
                this.logger.warn('Failed to initialize AWS S3, falling back to local storage');
                this.useLocalStorage = true;
            }
        }
        else {
            this.logger.log('AWS credentials not found, using local file storage');
        }
        if (this.useLocalStorage) {
            this.uploadsDir = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(this.uploadsDir)) {
                fs.mkdirSync(this.uploadsDir, { recursive: true });
                this.logger.log(`Created uploads directory: ${this.uploadsDir}`);
            }
        }
    }
    async uploadFile(buffer, key, contentType) {
        if (this.useLocalStorage) {
            return this.uploadFileLocal(buffer, key, contentType);
        }
        try {
            const params = {
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: contentType,
                ACL: 'public-read',
            };
            await this.s3.putObject(params).promise();
            return `https://${this.bucket}.s3.amazonaws.com/${key}`;
        }
        catch (error) {
            this.logger.error('Failed to upload to S3, falling back to local storage', error);
            return this.uploadFileLocal(buffer, key, contentType);
        }
    }
    async uploadFileLocal(buffer, key, contentType) {
        const filePath = path.join(this.uploadsDir, key);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, buffer);
        const backendUrl = this.configService.get('BACKEND_URL') ||
            this.configService.get('API_URL') ||
            'http://localhost:3001';
        return `${backendUrl}/uploads/${key}`;
    }
    async deleteFile(url) {
        if (this.useLocalStorage) {
            return this.deleteFileLocal(url);
        }
        try {
            const key = url.split('.com/')[1];
            if (!key)
                return;
            await this.s3
                .deleteObject({
                Bucket: this.bucket,
                Key: key,
            })
                .promise();
        }
        catch (error) {
            this.logger.error('Failed to delete from S3', error);
            this.deleteFileLocal(url);
        }
    }
    async deleteFileLocal(url) {
        try {
            const key = url.includes('/uploads/')
                ? url.split('/uploads/')[1]
                : url.split('/').pop();
            if (!key)
                return;
            const filePath = path.join(this.uploadsDir, key);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        catch (error) {
            this.logger.error('Failed to delete local file', error);
        }
    }
    async uploadImage(buffer, folder, filename) {
        const key = `${folder}/${filename}`;
        return this.uploadFile(buffer, key, 'image/png');
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map