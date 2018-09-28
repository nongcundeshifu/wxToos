/**  time:2018/9/4
 *   作者:农村的师傅
 *   功能:全局
 */
import tools from './utils/tools';
import regeneratorRuntime from './utils/regenerator-runtime/runtime-module';
import MTA from './MTA/mta_analysis';




module.exports = {
    tools,
    regeneratorRuntime,
    MTA,
    app: getApp(),

};
