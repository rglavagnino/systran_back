"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const base_model_1 = require("../models/base.model");
const base_controller_1 = require("./base.controller");
const base_service_1 = require("./base.service");
const cat_1 = require("./cat");
let BaseModule = class BaseModule {
};
BaseModule = __decorate([
    (0, common_1.Module)({
        controllers: [base_controller_1.BaseController],
        providers: [base_service_1.BaseService, cat_1.EstadoBase],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'BaseSchema', schema: base_model_1.BaseSchema }
            ])
        ]
    })
], BaseModule);
exports.BaseModule = BaseModule;
//# sourceMappingURL=base.module.js.map