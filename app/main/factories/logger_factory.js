function logger_factory(){
    var logs = [];
    var log = function log(msg, route){
        const now = new Date().toLocaleTimeString();
        thisLog = `${now}: ${route}: ${msg}`
        console.log(thisLog);      
        logs.push(thisLog)
    };
    var warn = function warn(msg, route){
        const now = new Date().toLocaleTimeString();
        thisWarn = `!!! ${now}: ${route}: ${msg} !!!`;
        console.log(thisWarn);
        logs.push(thisWarn);
    }
    var getLogs = function getLogs(){
        log("Retrieving Logs", "logger_factory.getLogs")
        return logs;
    };
    return{
        log: log,
        warn: warn,
        logs: getLogs
    };
}