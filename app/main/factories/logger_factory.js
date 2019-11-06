function logger_factory(){
    console.log('Initializing Logger Factory. About To Pass Logging Off To Logger...')
    var logs = [];

    
    var log = function log(msg, route){
        const now = new Date().toLocaleTimeString();
        thisLog = `${now}: ${route}: ${msg}`
            // prevent [ngRepeat:dupes] by appending id to duplicates
        if(logs.includes(thisLog)){
            let i = 1;
            while(logs.includes(thisLog)){
                thisLog = `${now}: repetition #${i}: ${route}: ${msg}`
                i++;
            }
        }
        console.log(thisLog);      
        logs.push(thisLog)
    };
    var warn = function warn(msg, route){
        const now = new Date().toLocaleTimeString();
        thisWarn = `!!! ${now}: ${route}: ${msg} !!!`;
            // prevent [ngRepeat:dupes] by appending id to duplicates
        if(logs.includes(thisWarn)){
            let i = 1;
            while(logs.includes(thisWarn)){
                thisWarn = `!!! ${now}: repetition #${i}: ${route}: ${msg} !!!`;
            }
        }
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