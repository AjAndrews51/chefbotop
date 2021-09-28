console.log('app started');


import tmi from 'tmi.js'
import { CHANNEL_NAME, OAUTH_TOKEN, BOT_USERNAME } from './constants';
import { rolldie} from './variables';
import fetch from "node-fetch";

var win = 0;
var loss = 0;


const client = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: CHANNEL_NAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
});

function onConnectedHandler (addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
  };

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();


/*basic commands */
function onMessageHandler (target, context, msg, self) {
	if (self) { return; } // Ignore messages from the bot
  
	// Remove whitespace from chat message
	const commandName = msg.trim();
	if (commandName === '!d20') {
	  const num = rolldie();
	  client.say(target.channel, `You rolled a ${num}`);
	  console.log(`* Executed ${commandName} command`);
	} else {
	  console.log(`* Unknown command ${commandName}`);
	};


	if (commandName === '!elo') {
		var ranks;
var id;

const api_key = 'RGAPI-45175915-74cd-493c-b78b-50b5741496a3';
let names = ['ChefAJ', 'Chef Arsehole J', 'ChefAjA', 'TheChefAj', 'UwuSenpaiSpankMe', 'AjxBlood', 'ExpansionRectum', 'AjxFear']
for (const name of names){
    var get_id = fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + api_key).then(data =>{return data.json()}).then(data => id = data).then(() => {
        var this_name = id.id
        var rank_data = fetch('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + this_name +'?api_key=' + api_key).then(data =>{return data.json()}).then(data => ranks = data).then(() => {
            if(ranks.length > 0){
                var tier = ranks[0].tier;
                var rank = ranks[0].rank;
                var LP = ranks[0].leaguePoints;
                client.say(target, name + ' is ' + tier + ' - ' + rank + ' ' + LP +' LP');
            }
            else{
                client.say(target, name + ' is unranked');
            }
            
        });
    });
};

if (commandName === '!win') {
    console.print(++w);
};
if (commandName === '!loss') {
    console.print(++l);
}

  

/* point system and point system commands */

/*gambling commands for point system*/

/* League Commands, Ranks, queue up for norms/customes etc*/

 

/*timed messages*/

/*bot ban call lines*/

/*music*/




	}}