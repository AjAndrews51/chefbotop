console.log('app started');


import tmi from 'tmi.js'
import { CHANNEL_NAME, OAUTH_TOKEN, BOT_USERNAME } from './constants';
import { rolldie} from './variables';

//import fetch  from "node-fetch";

var wincounter = 0;
var losscounter = 0;
var w = 1;
var l = 1;


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
console.log('debugg line 35');

/*basic commands */
function onMessageHandler (target, context, msg, self) {
	if (self) { return; } // Ignore messages from the bot
  
	// Remove whitespace from chat message
	const commandName = msg.trim();
	if (commandName === '!d20') {
	  const num = rolldie();
	  client.say(target, `You rolled a ${num}`);
	  console.log(`* Executed ${commandName} command`);
	} else {
	  console.log(`* Unknown command ${commandName}`);
	};
console.log('debug line 50');

	/*if (commandName === '!elo') {
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
}*/

//win loss counter crap!
if (commandName === '!win') {
	var wins = wincounter
	client.say(target, 'Added 1 win! Poggers!');
    console.log(wincounter = parseInt(wincounter) + 1);
};
if (commandName === '!loss') {
    console.log(losscounter = parseInt(losscounter) + 1);
	client.say(target, 'Added 1 loss! Fuck!')
};
if (commandName === '!reset') {
    console.log('reset');
	client.say(target, 'Reset win loss counter')
	wincounter = 0;
	losscounter = 0;
	console.log(wincounter,losscounter)
};
if (commandName === '!wl') {
	console.log(wincounter, '-' ,losscounter)
	client.say(target, wincounter + '-' + losscounter)
};

  

/* point system and point system commands */

/*gambling commands for point system*/

/* League Commands, Ranks, queue up for norms/customes etc*/

 

/*timed messages*/

/*bot ban call lines*/

/*music*/
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '6fcba4d088e6481d81e4d2e6ab03d0cd',
  clientSecret: '4509e25b62804060876cfd97dc9eaf02',
  redirectUri: 'https://getyourspotifyrefreshtoken.herokuapp.com/callback'
});
spotifyApi.setAccessToken('BQCe5EKqidkoNGlUhUtRJ3zMMQOMnPEiEnhcrB_U9KE2HrsEaYw4h1JoGe9MC_zHLkpJ5yaVcvTQ61AyuMNKbWiEWRyKz-itvtHTIpu_-qQc2ejrXG_cbK2OOCh5kESzLl5nurBDLFqv4nkN9XknK9kduy5ooNFc6R43dcU5Il55LLtXPnzxmoWXlqVnRJjEd8Uxqqbfgt3wB7ZY_yYSkKEZKjWKFoTW3iWM5wdJR7vTWNm0mVgdep1lUTWAHF3h5j_E9wEihPF0pRJPYx28CNUzVg');
//current song still need to figure out how to print out artist too
if (commandName === '!song') {
spotifyApi.getMyCurrentPlayingTrack()
  .then(function(data) {
    console.log('Now playing: ' + data.body.item.name);
	client.say(target, 'Now playing: ' + data.body.item.name);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}
}
