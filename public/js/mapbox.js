// export const displayMap = (locations) => {
//   mapboxgl.accessToken = 'your_mapbox_access_token_here';
//   const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     scrollZoom: false,
//   });

//   const bounds = new mapboxgl.lngLatBounds();

//   location.forEach((loc) => {
//     // Create marker
//     const el = document.createElement('div');
//     el.className = 'marker';

//     // Add marker
//     new mapboxgl.Marker({
//       element: el,
//       anchor: 'bottom',
//     })
//       .setLngLat(loc.coordinates)
//       .addTo(map);

//     new mapboxgl.Popup({ offset: 30 })
//       .setLngLat(loc.coordinates)
//       .setHTML(`<p>${loc.info}</p>`)
//       .addTo(map);

//     bounds.extend(loc.coordinates);
//   });

//   map.fitBounds(bounds, {
//     padding: { top: 200, bottom: 150, left: 100, right: 100 },
//   });
// };
