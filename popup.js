var QUERY = 'lab puppies';
var PAGE = 0;

var puppyGenerator = {
  _searchOnFlickr: function(page) {
    return 'https://secure.flickr.com/services/rest/?' +
    'method=flickr.photos.search&' +
    'api_key=53caa6bf9c68533d9fc34ca096bc6c72&' +
    'text=' + encodeURIComponent(QUERY) + '&' +
    'safe_search=1&' + 'content_type=1&' +
    'sort=interestingness-desc&' + 'per_page=100&' +
    'page=' + page.toString();
  },

  requestPuppies: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this._searchOnFlickr(++PAGE), true);
    req.onload = this.showPhotos.bind(this);
    req.send(null);
  },

  showPhotos: function(event) {
    var puppies = event.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < puppies.length; i++) {
      var img = document.createElement('img');
      img.src = this._constructPuppyURL(puppies[i]);
      img.setAttribute('alt', puppies[i].getAttribute('title'));
      document.body.appendChild(img);
    }
  },

  _constructPuppyURL: function(photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".staticflickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_q.jpg";
  },

  reloadPuppies: function() {
    document.addEventListener("scroll", function(event) {
      if (document.body.scrollHeight == document.body.scrollTop + window.innerHeight) {
        puppyGenerator.requestPuppies();
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  puppyGenerator.requestPuppies();
  puppyGenerator.reloadPuppies();
});
