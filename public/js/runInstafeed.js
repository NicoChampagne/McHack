

    var images = [];
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'mchacks',
        userId: 'niconoloco',
        // clientId: '6d61f0643abd49b5beb7137756ad73a4',
        accessToken: '186698776.ba4c844.74c77bb9492743b28af700a4e7efb0da',
      //   mock: true,
      //   success: function(data) {
      //     images = data.data;
      //     console.log(images);
      //     // images is an array of pictures
      // }

    });
    feed.run();
    console.log(images);
