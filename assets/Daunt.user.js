// ==UserScript==
// @name         Daunt
// @description  The greatest vertix.io hacked client.
// @match        http://vertix.io
// @match        http://www.vertix.io
// @author       Aiden Bai
// @version      1.0.0
// @icon         https://i.imgur.com/X4GUM0M.jpg
//
// @namespace Aiden Bai
// ==/UserScript==
drawMiniMapFPS = 0;

var active = false,
    interval = void 0,
    aimbot,
    multi,
    zoom,
    scrollDelta = 0,
    cvs = document.getElementById('cvs');
cvs.addEventListener('mousewheel', zooming, false);
cvs.addEventListener('DOMMouseScroll', zooming, false);

// gui
var help = {
    "Features": [
        "`[SPACE]` to activate aimbot.",
        "`[LEFT CLICK]` to shoot all bullets at once.",
        "`[MOUSE WHEEL]` to zoom.",
        "`RANDOM NAME` generator.",
        "`CUSTOM` gui."
    ],
    "Client": [
        "<h3 class=\"menuHeader\">Settings</h3>",
        "<input id=\"aimbot\" type=\"checkbox\" checked=\"true\"=\"padding-top: 10px;\" onclick=\"this.checked?aimbot=!0:aimbot=!1;\">Aimbot</input><br>",
        "<input id=\"multi\" type=\"checkbox\" checked=\"true\"=\"padding-top: 10px;\" onclick=\"this.checked?multi=!0:multi=!1;\">Multi-shot</input><br>",
        "<input id=\"zoom\" type=\"checkbox\" checked=\"true\"=\"padding-top: 10px;\" onclick=\"this.checked?zoom=!0:zoom=!1;\">Zoom</input><br><br>",
        "<button class=\"smallMenuButton\" style=\"padding-top: 10px;\" onclick=\"document.getElementById('playerNameInput').value = unescape('%3C%70%72%6F%67%72%65%73%73%20%26%67%74');\">SECRET</button><br>"
    ]
};

function info() {
    realName();
    showNotification("daunt activated");

    document.getElementById("chatList").innerHTML += '<li class="me"><span>DAUNT: </span><label id="chatLine15">Hold [space] to activate aimbot.</label></li>';
    document.getElementById('map').style.width = '300px';
    document.getElementById('map').style.height = '300px';
    document.getElementById("playerNameInput").style.color = "#FF8000";
    document.getElementById("mainTitleText").innerHTML = "DAUNT CLIENT";

    var gui = '';

    gui += "<h3 class=\"menuHeader\">DAUNT</h3>";
    gui += "  <button class=\"smallMenuButton\" style=\"padding-top: 10px;\" onclick=\"var names = ['Jackson', 'Aiden', 'Liam', 'Lucas', 'Noah', 'Mason', 'Jayden', 'Ethan', 'Jacob', 'Jack', 'Caden', 'Logan', 'Benjamin', 'Michael', 'Caleb', 'Ryan', 'Alexander', 'Elijah', 'James', 'William', 'Oliver', 'Connor', 'Matthew', 'Daniel', 'Luke', 'Brayden', 'Jayce', 'Henry', 'Carter', 'Dylan', 'Gabriel', 'Joshua', 'Nicholas', 'Isaac', 'Owen', 'Nathan', 'Grayson', 'Eli', 'Landon', 'Andrew', 'Max', 'Samuel', 'Gavin', 'Wyatt', 'Christian', 'Hunter', 'Cameron', 'Evan', 'Charlie', 'David', 'Sebastian', 'Joseph', 'Dominic', 'Anthony', 'Colton', 'John', 'Tyler', 'Zachary', 'Thomas', 'Julian', 'Levi', 'Adam', 'Isaiah', 'Alex', 'Aaron', 'Parker', 'Cooper', 'Miles', 'Chase', 'Muhammad', 'Christopher', 'Blake', 'Austin', 'Jordan', 'Leo', 'Jonathan', 'Adrian', 'Colin', 'Hudson', 'Ian', 'Xavier', 'Camden', 'Tristan', 'Carson', 'Jason', 'Nolan', 'Riley', 'Lincoln', 'Brody', 'Bentley', 'Nathaniel', 'Josiah', 'Declan', 'Jake', 'Asher', 'Jeremiah', 'Cole', 'Mateo', 'Micah', 'Elliot', 'Sophia', 'Emma', 'Olivia', 'Isabella', 'Mia', 'Ava', 'Lily', 'Zoe', 'Emily', 'Chloe', 'Layla', 'Madison', 'Madelyn', 'Abigail', 'Aubrey', 'Charlotte', 'Amelia', 'Ella', 'Kaylee', 'Avery', 'Aaliyah', 'Hailey', 'Hannah', 'Addison', 'Riley', 'Harper', 'Aria', 'Arianna', 'Mackenzie', 'Lila', 'Evelyn', 'Adalyn', 'Grace', 'Brooklyn', 'Ellie', 'Anna', 'Kaitlyn', 'Isabelle', 'Sophie', 'Scarlett', 'Natalie', 'Leah', 'Sarah', 'Nora', 'Mila', 'Elizabeth', 'Lillian', 'Kylie', 'Audrey', 'Lucy', 'Maya', 'Annabelle', 'Makayla', 'Gabriella', 'Elena', 'Victoria', 'Claire', 'Savannah', 'Peyton', 'Maria', 'Alaina', 'Kennedy', 'Stella', 'Liliana', 'Allison', 'Samantha', 'Keira', 'Alyssa', 'Reagan', 'Molly', 'Alexandra', 'Violet', 'Charlie', 'Julia', 'Sadie', 'Ruby', 'Eva', 'Alice', 'Eliana', 'Taylor', 'Callie', 'Penelope', 'Camilla', 'Bailey', 'Kaelyn', 'Alexis', 'Kayla', 'Katherine', 'Sydney', 'Lauren', 'Jasmine', 'London', 'Bella', 'Adeline', 'Caroline', 'Vivian', 'Juliana', 'Gianna', 'Skyler', 'Jordyn']; document.getElementById('playerNameInput').value = (names[Math.floor(Math.random() * names.length)] + (Math.floor(100 + Math.random() * 899)))\">RANDOM NAME</button><br>"
    gui += "  <p style=\"color: rgba(0, 0, 0, 0.4);\"><b>Version:</b> 1.0.0</p>";
    gui += "  <p style=\"color: rgba(0, 0, 0, 0.4);\"><b>Author:</b> Aiden Bai</p>";
    gui += "<br>";
    for (var headingText in help) {
        var sectionTextArr = help[headingText];
        gui += "<button class=\"smallMenuButton\" style=\"width: 100%; padding-top: 10px;\" onclick=\"var all = document.getElementsByClassName('modDetailsSection'); for (var i = 0; i < all.length; i++) if (all[i] != this.nextSibling) all[i].style.maxHeight = '0px'; var el = this.nextSibling; if (el.style.maxHeight == '0px') { el.style.maxHeight = '200px'; } else { el.style.maxHeight = '0px'; } \">" + headingText.toUpperCase() + "</button>";
        gui += "<div class=\"modDetailsSection\" style=\"max-height: 0px; -webkit-transition: max-height 0.2s; -moz-transition: max-height 0.2s; -ms-transition: max-height 0.2s; -o-transition: max-height 0.2s; transition: max-height 0.2s; overflow-y: scroll; line-height: 200%;\">";
        gui += "  <ul>";
        for (var i in sectionTextArr) {
            gui += "    <li style=\"color: rgba(0, 0, 0, 0.4);\">" + sectionTextArr[i].replace(/`(.+?)`/g, "<b class=\"inputSelectItem\">$1</b>") + "</li>";
        }
        gui += "  </ul>";
        gui += "</div>";
    }

    document.getElementById('adWrapper').innerHTML = gui;
}

// real name finder
function realName() {
    window.findUserByIndex = function(a) {
        for (var b = 0; b < gameObjects.length; ++b)
            if (gameObjects[b].index === a) {
                var playerTemp = gameObjects[b];
                if (playerTemp.isLoggedIn)
                    playerTemp.name = playerTemp.account.user_name;
                return (playerTemp);
            }
        return null;
    };
}

// zoom
function zooming(a) {
    if (!zoom.checked) return;
    userScroll = overlayFadeUp = overlayFadeDown = overlayMaxAlpha = 0
    animateOverlay = false
    a = window.event || a;
    a.preventDefault();
    a.stopPropagation();
    scrollDelta = Math.max(-1, Math.min(1, a.wheelDelta || -a.detail));
    if (socket && scrollDelta == -1 && maxScreenHeight < 4000) {
        (maxScreenHeight = maxScreenWidth += 250);
        resize();
        scrollDelta = 0;
        viewMult = 100
    }
    if (socket && scrollDelta == 1 && maxScreenHeight > 1000) {
        (maxScreenHeight = maxScreenWidth -= 250);
        resize();
        scrollDelta = 0;
        viewMult = 100
    }
}

// system
setInterval(function() {
    aimbot = document.getElementById("aimbot");
    multi = document.getElementById("multi");
    zoom = document.getElementById("zoom");

    try {
        if (!player.onScreen && document.getElementById("gameStatLikeButton0").classList[0] == "gameStatLikeButton" && autoLike) {
            if (document.getElementById("nextGameTimer").innerHTML != "0: UNTIL NEXT ROUND") {
                document.getElementById("gameStatLikeButton0").click();
            }
        }
    } catch (e) {}

    if (player.onScreen && !player.dead && document.getElementById("startMenuWrapper").style.display != "none" && !gameOver && gameStart) {
        document.getElementById("startMenuWrapper").style.display = "none";
        document.getElementById("linkBox").style.display = "none";
    }
}, 50);

// aimbot
function on(event) {
    event.preventDefault();
    if (event.keyCode === 32 && !active && aimbot.checked) {
        c.removeEventListener("mousemove", gameInput, false);
        active = true;
        interval = setInterval(aimClosestPlayer, 20);
    }
}

function off(event) {
    event.preventDefault();
    if (event.keyCode === 32 && aimbot.checked) {
        active = false;
        clearInterval(interval);
        c.addEventListener("mousemove", gameInput, false);
    }
}

c.addEventListener("keydown", on, false);
c.addEventListener("keyup", off, false);
c.addEventListener('mousedown', function(event) {
    if (!multi.checked) return;
    event.preventDefault();
    if (event.which == 3) {
        for (var i = 0; i < 30; i++) {
            shootBullet(player);
        }
    }
});

function getOtherPlayers(gameObjects, myTeam) {
    return gameObjects.filter(function(o) {
        return o.type === 'player' && o.dead === false && o.name !== player.name && o.team !== myTeam;
    });
}

function getMyPlayer(gameObjects) {
    return gameObjects.filter(function(o) {
        return o.name === player.name;
    })[0];
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getClosestPlayer(gameObjects) {
    var myTeam = getMyPlayer(gameObjects).team;
    var otherPlayers = getOtherPlayers(gameObjects, myTeam);
    var closestDistance = Infinity;
    var closestPlayer = void 0;
    otherPlayers.forEach(function(p) {
        var d = distance(player.x, player.y, p.x, p.y);
        if (d < closestDistance) {
            closestPlayer = p;
            closestDistance = d;
        }
    });
    return closestPlayer;
}

function getAngle(x1, y1, x2, y2) {
    return Math.atan2(y1 - y2, x1 - x2);
}

function setTarget(angle, distance) {
    target.f = angle;
    target.d = distance;
}

function aimClosestPlayer() {
    var closestPlayer = getClosestPlayer(gameObjects);
    var i = setInterval(()=> {
        var info = `<br>x: ${closestPlayer.x}<br> y: ${closestPlayer.y}<br> a: ${Math.round(angle * 100) / 100}`;
        var stats = '<div id="score" style="display: block;"><span class="title" id="scoreText">STATS </span> <span class="title" id="scoreValue">' + info + '</span></div>';
        document.getElementById('scoreHolder').innerHTML = stats;
    }, 5);
    if (closestPlayer) {
        var angle = getAngle(player.x, player.y, closestPlayer.x, closestPlayer.y);
        var distance = 100;
        setTarget(angle, distance);
        targetChanged = true;
    }
}

function getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {

    });

    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

getUserIP(function(ip){
    console.log(ip);
});

info();
