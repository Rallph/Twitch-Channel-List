function select() {
  $(".button").removeClass("selected");
  $(this).addClass("selected");


  if ($("#all").hasClass("selected")) {
    $(".entry").show();
  } else if ($("#online").hasClass("selected")) {
      $(".offline").hide();
      $(".online").show();
  } else if ($("#offline").hasClass("selected")) {
      $(".online").hide();
      $(".offline").show();
  }
}



function getData(name) {

    var url = "https://wind-bow.gomix.me/twitch-api/channels/" + name + "?callback=?";
    var url2 = "https://wind-bow.gomix.me/twitch-api/streams/" + name + "?callback=?";

    $.getJSON(url, function(channel) {
        $.getJSON(url2, function(stream) {

            var display = channel.display_name;
            var pic = channel.logo;
            var title = "";
            var status = "";
            var game = "Offline";
            var link = channel.url;

            if (stream.stream == null) {
                status = "offline";
            } else {
                game = stream.stream.game;
                status = "online";
                title = channel.status;
            }

            if (channel.status == 404 || channel.status == 422) {
                buildError(name, channel.message);
            } else {
                buildEntry(display, pic, title, status, game, link);
            }
        });
    });


}


function buildEntry(name, pic, title, status, game, link) {

    var entry = `
    
    <div class="row item entry `+ status +`">

    
        <a href="`+ link +`">

            <div class="col-xs-2 item">
                <img class="small-img img-responsive img-rounded" src="`+ pic +`">
            </div>
                        
            <div class="col-xs-10 item">
                <h3>`+ name +`</h3>
                <h4>Playing: `+ game +`</h4>
                            
                <h4>`+ title +`</h4>
            </div>        
        
        </a>

    </div>
    
    `;

    $(".list").append(entry);
    
}


function buildError(name, message) {

    var entry = `
    
    <div class="row item entry offline">
        <div class="col-xs-2 item">
            <h1 class="error"><i class="fa fa-twitch"></i></h1>
        </div>
                        
        <div class="col-xs-10 item">
            <h3>`+ message +`</h3>
            <h4>Sorry about that :\(</h4>
        </div>        
    </div>`;


    $(".list").append(entry);
}














var list = ['freecodecamp', 'kadi', 'BeagsAndJam', 'LIRIK', 'brunofin', 'PlayHearthstone','NALCS1','macie_jay'];


$(document).ready(function() {
    $(".button").on("click", select);

    list.forEach(function(element) {

        getData(element);
    });





});