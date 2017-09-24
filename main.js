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
	    prune(cid, parseInt(args[1])); break;
	}
    }
});

function prune(cid, num) {
    log('deleting ' + num + ' messages from ' + cid);
    var lastmsg = (bot.channels[cid] || bot.directMessages[cid]).last_message_id;
    if (num <= 100) {
	log(num);
	var delMsgs = [];
	bot.getMessages({
	    channelID: cid,
	    before: lastmsg,
	    limit: num
	}, (err, msgArr) => {
	    if (err) {
		log(err);
		return;
	    }
	    for (var i = 0; i < msgArr.length; ++i)
		if (msgArr[i].author.id == myUID) {
		    delMsgs.push(msgArr[i].id);
		    log(delMsgs);
		}
	    bot.deleteMessages({
		channelID: cid,
		messageIDs: delMsgs
	    });
	});
    }
    log('only prune 100 or less :(');
}
