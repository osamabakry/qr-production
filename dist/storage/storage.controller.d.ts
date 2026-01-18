import { StorageService } from './storage.service';
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadFile(file: MulterFile, body: {
        folder?: string;
    }): Promise<{
        url: string;
        filename: string;
        size: number;
        mimetype: string;
    }>;
}
export {};
