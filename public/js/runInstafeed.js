

    var images = [];
    var finalImg = [];
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'mchacks',
        userId: 'niconoloco',
        accessToken: '186698776.ba4c844.74c77bb9492743b28af700a4e7efb0da',
        limit: '70',
        resolution: 'standard_resolution',
        template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
        mock: true,
        success: function getimages(data) {
          images = data.data;
          for(i=0;i<images.length;i++)
          {
            finalImg[i]=images[i].images.standard_resolution.url.substring(8);
          }
      }

    });
    feed.run();
    setTimeout(function(){
    },1000);

    function getArray() {
      return this.finalImg;
    }
