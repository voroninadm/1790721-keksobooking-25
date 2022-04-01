import { getPopup } from './popup.js';
import { adsFilter } from './form-filter.js';
import { toggleFormToUnactive } from './form.js';

const latLngField = document.querySelector('[name="address"]');

const map = L.map('map-canvas');
const mainMarkerGroup = L.layerGroup().addTo(map);
const markerGroup = L.layerGroup().addTo(map);
const MAP_START_ZOOM = 12.5;

const centerOfCity = {
  lat: 35.68442,
  lng: 139.75425
};
const mainPinStartPosition = {
  lat: 35.68442,
  lng: 139.75425
};
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: mainPinStartPosition.lat,
    lng: mainPinStartPosition.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const renderMainPinToMap = () => {
  mainPinMarker.addTo(mainMarkerGroup);
};

const onMainPinMove = () => {
  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    latLngField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};

// L.tileLayer(
//   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//   {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     minZoom: 6,
//   },
// ).addTo(map);


const renderMarker = (object) => {
  const lat = object.location.lat;
  const lng = object.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: similarPinIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(getPopup(object));
};

const renderMarkers = (array) => {
  array.forEach((element) => {
    renderMarker(element);
  });
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};


//=======MAP INITIALIZE
// const mapInit = (cb) => {
//   map.on('load', () => {
//     setTimeout(cb, 500);
//     mainPinMarker.addTo(mainMarkerGroup);
//     latLngField.value = `${mainPinStartPosition.lat}, ${mainPinStartPosition.lng}`;
//     mainPinMarker.on('moveend', (evt) => {
//       const lat = evt.target.getLatLng().lat;
//       const lng = evt.target.getLatLng().lng;
//       latLngField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
//     });
//   })
//     .setView({
//       lat: centerOfCity.lat,
//       lng: centerOfCity.lng
//     }, MAP_START_ZOOM);
// };

const mapInit = (cb) => {
  map.on('load', () => {
    renderMainPinToMap();
    latLngField.value = `${mainPinStartPosition.lat}, ${mainPinStartPosition.lng}`;
    onMainPinMove();
    cb();
  })
    .setView(centerOfCity, MAP_START_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 6,
    },
  ).addTo(map);
};

//=======CLOSE MAP POPUP
const closeMapPopup = () => {
  map.closePopup();
};

//=======RESET MAP TO DEFAULT
const mapReset = () => {
  latLngField.value = `${mainPinStartPosition.lat}, ${mainPinStartPosition.lng}`;
  mainPinMarker.setLatLng({
    lat: mainPinStartPosition.lat,
    lng: mainPinStartPosition.lng,
  });
  map.setView({
    lat: centerOfCity.lat,
    lng: centerOfCity.lng,
  }, MAP_START_ZOOM);
};


const render = (array) => {
  renderMarkers(array.slice(0, 10));
  adsFilter(array, () => markerGroup.clearLayers());
};

export { mapInit, mapReset, closeMapPopup, renderMarkers, clearMarkers, render, renderMainPinToMap };
