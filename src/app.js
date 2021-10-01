console.log('app started');

/*const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);*/


const fs =require('fs')
const tmi = require('tmi.js');
import { CHANNEL_NAME, OAUTH_TOKEN, BOT_USERNAME } from './constants';
import { rolldie} from './variables';
import fetch  from "node-fetch";
var MySql = require('sync-mysql');

var connection = new MySql({
  host: 'localhost',
  user: 'root',
  password: ''
});
 
//const result = connection.query('SELECT 1 + 1 AS solution');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '',
    database : 'chefbot'
  }
});
 
//const fetch = require('node-fetch');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var wincounter = 0;
var losscounter = 0;
var w = 1;
var l = 1;


const client_ttv = new tmi.Client({
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

client_ttv.on('message', onMessageHandler);
client_ttv.on('connected', onConnectedHandler);
// Connect to Twitch:
client_ttv.connect();

//channel = userdata

/*basic commands */
function onMessageHandler (target, channel, message, self,) { //added userstate cause message.trim(); to not work
    const badges = channel.badges || {};
    const isBroadcaster = badges.broadcaster;
    const isMod = badges.moderator;
    const isModUp = isBroadcaster || isMod;
//test to see if message spliting works


	if (self) { return; } // Ignore messages from the bot
  var commandName = message.trim();
  const args = commandName.split(" ");
  commandName = args[0];
  console.log(args)
  //const PREFIX = "!";
  //let [commandName, ...args] = message.slice(PREFIX.length).split(/ +/g);
	// Remove whitespace from chat message 	JSON.stringify(userstate);
	
  if (commandName === '!d20') {
	  const num = rolldie();
	  client_ttv.say(target, `@${channel.username} rolled a ${num}`);
	  console.log(`* Executed ${commandName} command`);
	} else {
	  console.log(`* Unknown command ${commandName}`);
	};

var twtchname = (channel.username)

if (commandName === '!test'){
 console.log('test command not set up')
    }

  if (commandName === '!joinq') {
    knex('queue')
  .insert({
    username: (channel.username),
  })
  .onConflict(channel.username)
  .ignore()
  .catch(function(error) {
    console.log(error)
  });
  knex.select('fuck')
  .from('queue')
  .where({ username: (twtchname) })
  .then(function(rows){
    const fck =  JSON.stringify(rows);
    const fcks = JSON.parse(fck);
    console.log(fck[9]);
    client_ttv.say(target, '@'+(twtchname)+ ' in queue at position '+(fck[9]))
  })
     // client_ttv.say(target, `@${channel.username} addedto queue your position in queue is ` (fck)[9] );
       console.log("1 record inserted") 
      };
//Doesnt add username only adds +channel.username+ too DB

	if (commandName === '!elo') {
		var ranks;
var id;

const api_key = 'RGAPI-0889f6b1-bf25-4b9c-b6e9-1abf93e63bd3';
let names = ['ChefAJ', 'Chef Arsehole J', 'ChefAjA', 'TheChefAj', 'UwuSenpaiSpankMe', 'AjxBlood', 'ExpansionRectum', 'AjxFear']
for (const name of names){
    var get_id = fetch('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + api_key).then(data =>{return data.json()}).then(data => id = data).then(() => {
        var this_name = id.id
        var rank_data = fetch('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + this_name +'?api_key=' + api_key).then(data =>{return data.json()}).then(data => ranks = data).then(() => {
            if(ranks.length > 0){
                var tier = ranks[0].tier;
                var rank = ranks[0].rank;
                var LP = ranks[0].leaguePoints;
                client_ttv.say(target, name + ' is ' + tier + ' - ' + rank + ' ' + LP +' LP');
            }
            else{
                client_ttv.say(target, name + ' is unranked');
            }
            
        });
    });
}};

//win loss counter crap!
    // Something mod only
if(isModUp) {

 if(commandName === '!dq') {  
      knex('queue')
  .where({fuck : '1, 2 , 3, 4'})
  .del()
  .then()
  console.log('1 row deleted')
};


if (commandName === '!resettest'){
  knex.schema.raw('ALTER TABLE `queue` AUTO_INCREMENT = 1')
  .then()

};
if (commandName === '!win') {
	var wins = wincounter
	client_ttv.say(target, 'Added 1 win! Poggers!');
    console.log(wincounter = parseInt(wincounter) + 1);
    fs.writeFile('winloss.txt', wincounter + "-" + losscounter, fuck)
};
if (commandName === '!loss') {
    console.log(losscounter = parseInt(losscounter) + 1);
	client_ttv.say(target, 'Added 1 loss! Fuck!')
  fs.writeFile('winloss.txt', wincounter + "-" + losscounter, fuck)
}
if (commandName === '!reset') {
    console.log('reset');
	client_ttv.say(target, 'Reset win loss counter')
	wincounter = 0;
	losscounter = 0;
	console.log(wincounter,losscounter)
	fs.writeFile('winloss.txt', '0-0', fuck)
}
if (commandName === '!wl') {
	console.log(wincounter, '-' ,losscounter)
	client_ttv.say(target,'W: ' + wincounter + '-' + 'L: ' + losscounter)
	fs.writeFile('winloss.txt', wincounter + "-" + losscounter, fuck)
}
if (commandName === '!clearq') {
  client_ttv.say(target, "Queue Cleared!");
  knex.raw('truncate table queue')
  .then()
      console.log("Queue Cleared");
    } ;

    
  

};;


function fuck(){
	console.log('you fucked up bitch')
};

function penis(){
  console.log('poggers code erected like a penis!')
};



/* point system and point system commands */

/*gambling commands for point system*/

/* League Commands, Ranks, queue up for norms/customes etc*/

 

/*timed messages*/

/*bot ban call lines*/

/*music*/
/*var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '6fcba4d088e6481d81e4d2e6ab03d0cd',
  clientSecret: '4509e25b62804060876cfd97dc9eaf02',
  refreshToken: 'AQC2F_3ks7ZpybtQj3lrR5dd18KEgxE5zAOiU78K_WhDIECAyUOeW65EKi_LsBCPWfubRMcwd-AGV-zeXt6U11fw0s9YzkOeF5I7fWN6BqMabn17SNvMU7E63Yp_xm2FoqQ',
  redirectUri: 'https://getyourspotifyrefreshtoken.herokuapp.com/callback'
});

var code = fetch('https://accounts.spotify.com/authorize?client_id=6fcba4d088e6481d81e4d2e6ab03d0cd&response_type=code&redirect_uri=https%3A%2F%2Fgetyourspotifyrefreshtoken.herokuapp.com%2fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09');

// Retrieve an access token and a refresh token
spotifyApi.authorizationCodeGrant(code).then(
  function(data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);
spotifyApi.refreshAccessToken().then(
	function(data) {
	  console.log('The access token has been refreshed!');
  
	  // Save the access token so that it's used in future calls
	  spotifyApi.setAccessToken(data.body['access_token']);
	},
	function(err) {
	  console.log('Could not refresh access token', err);
	}
  );
spotifyApi.setAccessToken('BQCHNjlMxzSdIJi_O83Uks4n9C6XL9hLI41mrHISaxz_pUSPkmVj9vEEqUrzZU-GlesZKdJlY1JfQprHKwWtTQhHPKFG8L8HwlqFB0so8VvSqpx993GcsxHoQ1ijyulOojS_cXCTTRp9sWtIlrwhxfIgNaqlkxulkLybZa8f_wU8fvgqC7a62Tp4HSK7RA8DtEkjx2hCRddKFxlL02sBUmxbv4AfXbOFUESODYqPTgD_Qs0pfXc4qeIdxbvaUEZvHLhzces0xIMNespKtGzp5Ju7cw');
//current song still need to figure out how to print out artist too


if (commandName === '!song') {
spotifyApi.getMyCurrentPlayingTrack()
  .then(function(data) {
    console.log('Now playing: ' + data.body.item.name);
	client_ttv.say(target, 'Now playing: ' + data.body.item.name);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}
}*/
}