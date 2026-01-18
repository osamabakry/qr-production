"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCodesModule = void 0;
const common_1 = require("@nestjs/common");
const qr_codes_service_1 = require("./qr-codes.service");
const qr_codes_controller_1 = require("./qr-codes.controller");
const public_qr_controller_1 = require("./public-qr.controller");
const storage_module_1 = require("../storage/storage.module");
let QrCodesModule = class QrCodesModule {
};
exports.QrCodesModule = QrCodesModule;
exports.QrCodesModule = QrCodesModule = __decorate([
    (0, common_1.Module)({
        imports: [storage_module_1.StorageModule],
        controllers: [qr_codes_controller_1.QrCodesController, public_qr_controller_1.PublicQrController],
        providers: [qr_codes_service_1.QrCodesService],
        exports: [qr_codes_service_1.QrCodesService],
    })
], QrCodesModule);
//# sourceMappingURL=qr-codes.module.js.map