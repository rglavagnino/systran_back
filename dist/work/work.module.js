"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const working_model_1 = require("../models/working.model");
const work_controller_1 = require("./work.controller");
const work_service_1 = require("./work.service");
let WorkModule = class WorkModule {
};
WorkModule = __decorate([
    (0, common_1.Module)({
        controllers: [work_controller_1.WorkController],
        providers: [work_service_1.WorkService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'WorkingSchema', schema: working_model_1.workingSchema }
            ])
        ]
    })
], WorkModule);
exports.WorkModule = WorkModule;
//# sourceMappingURL=work.module.js.map