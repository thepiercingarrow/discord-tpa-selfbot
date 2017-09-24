var PREFIX = '$';

var myUID;

var logelement;

function init() {
    logelement = document.getElementById('log');
}

function log(m, color) {
    var msg = document.createElement('li');
    msg.appendChild(document.createTextNode(m));
    logelement.appendChild(msg);
}

var bot = new Discord.Client({
    token: prompt("token plz thank"),
    autorun: true
});

bot.on('ready', function() {
    log("started", "green");
    myUID = bot.id;
    log("uid: " + myUID);
});

bot.on('message', function(user, uid, cid, m, e) {
    if (m.substring(0, PREFIX.length) == PREFIX) {
	var args = m.substring(PREFIX.length).split(' ');
	switch (args[0]) {
	case 'prune':
	    prune(cid, args[1]); break;
	}
    }
});

function prune(cid, num) {
    var earliest = bot.channels[cid].last_message_id;
    while (num > 0) {
	if (num <= 100) {
	    // finish up and break
	    bot.getMessages({
		channelID: cid,
		before: earliest,
		limit: num
	    }, (err, msgArr) => {
		for (i = 0; i < msgArr.length; ++i)
		    console.log(msgArr[i]);
	    });
			    
	}
	num -= 99;
	console.log('');
    }
}
