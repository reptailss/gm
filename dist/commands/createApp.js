#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateApp_1 = require("../src/createApp/CreateApp");
const args = process.argv.slice(2);
const appName = args[0];
if (!appName) {
    console.error('Please provide an app name: create-app <appName>');
    process.exit(1);
}
new CreateApp_1.CreateApp(appName)
    .run()
    .then(() => {
    console.log('Success Create App');
})
    .catch((err) => {
    console.error('Error creating app:', err);
    process.exit(1);
});
//# sourceMappingURL=createApp.js.map