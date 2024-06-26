// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom

    });


    const marker = new mapboxgl.Marker({color : "red"})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(
             new mapboxgl.Popup({offset : 20})
            .setHTML(`<h5>${listing.title}</h5> <p> Exact location will be provided after booking`)
            )
        .addTo(map);