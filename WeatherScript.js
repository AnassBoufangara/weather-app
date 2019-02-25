(function() {

  let timer;
  window.addEventListener("load", () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let proxy = 'https://cors-anywhere.herokuapp.com/';
        let api = proxy+'https://api.darksky.net/forecast/c4aee04ae3f4c47bbff038ff39018ae2/'+position.coords.latitude+','+position.coords.longitude+'';
        loadData(api);
      });
    }else {
      alert("You are not allowing geolocation access");
    }
    });


    var loadData = function(api){
      fetch(api)
          .then(resopnse => {
            return resopnse.json();
          })
          .then(data => {
            setData(data);
          });
    }

  function setData(data) {
    let skycons = new Skycons({"color":"white"});
    let index = 0;
    let specify;
    document.querySelector('#infoDate').innerHTML = (new Date().toDateString());
    document.querySelector('#infoLocation').innerHTML = (data.timezone).replace("/", ", ");

    let children = Array.from(document.getElementById('WeadValue').children);
    children.forEach(x => {

        skycons.add(x.children[0].id, (data.daily.data[index].icon).replace(/-/g, "_").toUpperCase());
        x.children[1].innerHTML = data.daily.data[index].summary;
        x.children[2].innerHTML = Math.floor(data.daily.data[index].temperatureHigh)+"&deg;F";
        x.children[3].innerHTML = Math.floor(((parseFloat(data.daily.data[index].temperatureHigh) - 32)/1.8))+"&deg;C";
        x.children[4].innerHTML = new Date(data.daily.data[index].time*1000).toDateString();
        index++;
    });
    skycons.play();
    SetTime(data.timezone);


  }

  function SetTime(data) {
    timer = setInterval(() => {
      document.querySelector('.time').innerHTML = (new Date().toLocaleTimeString());
    }, 1000);
  }
})();








/*

Sample API Call
To see which API endpoints and options are available, please consult our documentation.

https://api.darksky.net/forecast/c4aee04ae3f4c47bbff038ff39018ae2/37.8267,-122.4233

*/