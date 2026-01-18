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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicQrController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const qr_codes_service_1 = require("./qr-codes.service");
let PublicQrController = class PublicQrController {
    constructor(qrCodesService) {
        this.qrCodesService = qrCodesService;
    }
    async getQrCodeByCode(code, req) {
        const ipAddress = req.ip || req.headers['x-forwarded-for'];
        const userAgent = req.headers['user-agent'];
        return this.qrCodesService.getQrCodeByCode(code);
    }
};
exports.PublicQrController = PublicQrController;
__decorate([
    (0, common_1.Get)(':code'),
    (0, swagger_1.ApiOperation)({ summary: 'Get QR code by code (public, tracks scan)' }),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PublicQrController.prototype, "getQrCodeByCode", null);
exports.PublicQrController = PublicQrController = __decorate([
    (0, swagger_1.ApiTags)('Public QR'),
    (0, common_1.Controller)('public/qr-codes'),
    __metadata("design:paramtypes", [qr_codes_service_1.QrCodesService])
], PublicQrController);
//# sourceMappingURL=public-qr.controller.js.map