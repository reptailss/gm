#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateApp_1 = require("../src/createApp/CreateApp");
const CreateAppConfigBuilder_1 = require("../src/createApp/config/CreateAppConfigBuilder");
const args = process.argv.slice(2);
console.log(args, 'args');
const appName = args[0];
if (!appName) {
    console.error('Please provide an app name: create-app <appName>');
    process.exit(1);
}
new CreateApp_1.CreateApp(appName, CreateAppConfigBuilder_1.CreateAppConfigBuilder.createFromArgs(args))
    .run()
    .then(() => {
    console.log('Success Create App');
})
    .catch((err) => {
    console.error('Error creating app:', err);
    process.exit(1);
});
//# sourceMappingURL=createApp2.js.map