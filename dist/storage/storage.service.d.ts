import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private configService;
    private s3;
    private bucket;
    private useLocalStorage;
    private uploadsDir;
    private readonly logger;
    constructor(configService: ConfigService);
    uploadFile(buffer: Buffer, key: string, contentType: string): Promise<string>;
    private uploadFileLocal;
    deleteFile(url: string): Promise<void>;
    private deleteFileLocal;
    uploadImage(buffer: Buffer, folder: string, filename: string): Promise<string>;
}
