function logger_factory(){
    var logs = [];
    var log = function log(msg, route){
        const now = new Date().toLocaleTimeString();
        thisLog = `app log: ${route}: ${now}: ${msg}`
        console.log(thisLog);      
        logs.push(thisLog)
    };
    var warn = function warn(msg, route){
        const now = new Date().toLocaleTimeString();
        thisWarn = `app WARN: !!! ${route}: ${now}: ${msg} !!!`;
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