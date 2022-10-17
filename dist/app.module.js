"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const conexiones_1 = require("./utils/conexiones");
const vivo_module_1 = require("./vivo/vivo.module");
const raidd_module_1 = require("./raidd/raidd.module");
const cat_controller_1 = require("./cat/cat.controller");
const cat_service_1 = require("./cat/cat.service");
const cat_module_1 = require("./cat/cat.module");
const tipoBitacora_model_1 = require("./models/tipoBitacora.model");
const estadoBitacora_model_1 = require("./models/estadoBitacora.model");
const elementoBitacora_model_1 = require("./models/elementoBitacora.model");
const auth_module_1 = require("./auth/auth.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const auth_model_1 = require("./models/auth.model");
const base_module_1 = require("./base/base.module");
const variable_module_1 = require("./variable/variable.module");
const cat_variable_module_1 = require("./cat-variable/cat-variable.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [vivo_module_1.VivoModule, mongoose_1.MongooseModule.forRoot((0, conexiones_1.obtenerConexiones)(1)), raidd_module_1.RaiddModule,
            cat_module_1.CatModule, mongoose_1.MongooseModule.forFeature([
                { name: 'Tipo', schema: tipoBitacora_model_1.tipoBitacoraSchema },
                { name: 'Estado', schema: estadoBitacora_model_1.estadoBitacoraSchema },
                { name: 'ElementoBitacora', schema: elementoBitacora_model_1.elementoBitacoraSchema },
                { name: 'authSchema', schema: auth_model_1.authSchema }
            ]), auth_module_1.AuthModule, base_module_1.BaseModule, variable_module_1.VariableModule, cat_variable_module_1.CatVariableModule
        ],
        controllers: [app_controller_1.AppController, cat_controller_1.CatController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, cat_service_1.CatService, auth_service_1.AuthService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map