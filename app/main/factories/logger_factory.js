function logger_factory(){
    var logs = [];
    var log = function log(msg, route){
        const now = new Date().toLocaleTimeString();
        thisLog = `log: ${now}: ${route}: ${msg}`
        console.log(thisLog);      
        logs.push(thisLog)
    };
    var warn = function warn(msg, route){
        const now = new Date().toLocaleTimeString();
        thisWarn = `app WARN: !!! ${now}: ${route}: ${msg} !!!`;
        console.log(thisWarn);
        logs.push(thisWarn);
    }
    var getLogs = function getLogs(){
        return logs;
    };
    return{
        log: log,
        warn: warn,
        logs: getLogs
    };
}