const { SteamService } = require('../container.js');

exports.serverWakeup = async function(_, res) {
    const response = {};

    try {
        await SteamService.serverWakeup();
        response['message'] = 'OK';
    } catch(e) {
        console.log(e);
        response['message'] = 'steam-serv did not respond';
    }

    res.send(200, response);
};