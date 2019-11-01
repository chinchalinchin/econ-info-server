module.exports = {
    log: log,
    getCurrentTime: getCurrentTime
}

function log(msg, route){
    const now = new Date().toLocaleTimeString();
    console.log(`app.js: ${now}: ${route}: ${msg}`);
};

function getCurrentTime(){
    return Date().toLocaleTimeString()
}