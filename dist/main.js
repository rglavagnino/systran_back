"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const puerto = 5000;
async function bootstrap() {
    console.log('Iniciando el Systran..... en el puerto ' + puerto);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    await app.listen(puerto);
}
bootstrap();
//# sourceMappingURL=main.js.map