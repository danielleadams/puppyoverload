var QUERY = 'lab puppies';
var PAGE = 0;

var puppyGenerator = {
  init: function() {
    document.body.innerHTML = "";
    this.requestPuppies();
    this.reloadPuppies();
  },
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
    req.open('GET', this._searchOnFlickr(++PAGE), true);
    req.onload = this.showPuppyPhotos.bind(this);
    req.send(null);
  },
  showPuppyPhotos: function(event) {
    var puppies = event.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < puppies.length; i++) {
      var img = document.createElement('img');
      img.src = this._constructPuppyURL(puppies[i]);
      img.setAttribute('alt', puppies[i].getAttribute('title'));
      this.setPuppyLayout(img);
      document.body.appendChild(img);
    }
  },
  _constructPuppyURL: function(photo) {
    return 'https://farm' + photo.getAttribute('farm') +
        '.staticflickr.com/' + photo.getAttribute('server') +
        '/' + photo.getAttribute('id') +
        '_' + photo.getAttribute('secret') +
        '_q.jpg';
  },
  setPuppyLayout: function(photo) {
    photo.setAttribute('style', 'border: 1px solid black; margin: 5px');
    photo.setAttribute('align', 'justify')
    photo.setAttribute('width', '143px');
    photo.setAttribute('height', '143px');
  },
  reloadPuppies: function() {
    document.addEventListener('scroll', function(event) {
      if (document.body.scrollHeight == document.body.scrollTop + window.innerHeight) {
        puppyGenerator.requestPuppies();
      }
    });
  }
};

(function(document) {
  console.log('Puppy overloadddd...');
  puppyGenerator.init();
})(document);
