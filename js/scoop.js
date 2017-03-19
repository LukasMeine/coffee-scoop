lines = 0;
comits = 0;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
$.fn.scoop = function(mugs, username) {
    large = '<section class="git-stats-frame"> <div class="stats-container"> <!-- <img class="stats-image" src="https://freeiconshop.com/wp-content/uploads/edd/coffee-flat.png" alt="icon" /> --> <img class="stats-image" src="http://www.free-icons-download.net/images/hot-coffee-icon-81438.png" alt="icon" /> <p id="mugs">567</p> <div class="divider"></div> <h4>Coffee Mugs</h4> </div> <div class="stats-container"> <!-- <img class="stats-image" src="https://freeiconshop.com/wp-content/uploads/edd/code-flat.png" alt="icon" /> --> <img class="stats-image" src="http://simpleicon.com/wp-content/uploads/Code-Optimization.png" alt="icon" /> <p id="code">22808</p> <div class="divider"></div> <h4>Lines of code</h4> </div> <div class="stats-container"> <!-- <img class="stats-image" src="http://seacliffehotel.com/wp-content/uploads/2015/08/facebook-verified-account-logo.png" alt="icon" /> --> <img class="stats-image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/103766-200.png" alt="icon" /> <p id="commits">13</p> <div class="divider"></div> <h4>Commits</h4> </div> <div class="stats-container"> <img class="stats-image" src="https://rocket-league.com/content/media/users/avatar/256px/2fb4c258201485594731.png" alt="icon" /> <p>Noot!</p> <div class="divider"></div> <h4>You can just put whatever you want here</h4> </div> <div class="credits-row" title="Github"> <p class="stats-credits">Statistics provided by</p> <a href="https://github.com" target="_blank" alt="Github"><img class="sizing-github" src="https://cdn2.iconfinder.com/data/icons/well-known-1/1024/GitHub-512.png" alt="Github" /></a> </div> </section>';
    this.html(large);
    if (getCookie('lines') !== "" || getCookie('commits') !== "") {
        $('#commits').text(getCookie('commits'));
        $('#code').text(getCookie('lines'));
    } else {
        $.get("https://api.github.com/users/" + username + "/repos", function(data) {
            $.each(data, function(index, object) {
                $.get(object.url + "/stats/contributors", function(dados) {
                    dados.forEach(function(week, index) {
                        week.weeks.forEach(function(details, index) {
                            console.log(comits);
                            lines = lines + details.a;
                            comits = comits + details.c;
                            $('#commits').text(comits);
                            $('#code').text(lines);
                            $('#mugs').text(mugs);
                            setCookie('lines', lines, 365);
                            setCookie('commits', comits, 365);
                        });
                    });
                })
            });
        });
        return this;
    }
};
