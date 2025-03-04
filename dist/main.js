"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: 'chave',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '../front', 'public'), {
        prefix: '/public/'
    });
    app.setBaseViewsDir((0, path_1.join)(__dirname, '../front', 'paginas'));
    app.setViewEngine('hbs');
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map