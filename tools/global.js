import tools from './utils/tools.js';
import regeneratorRuntime from './utils/regenerator-runtime/runtime-module.js';
const global = {
    app:getApp(),
    tools,
    regeneratorRuntime
}


module.exports = global;
