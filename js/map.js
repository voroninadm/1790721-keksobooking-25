import { getPopup } from './popup.js';

const latLngField = document.querySelector('[name="address"]');

const map = L.map('map-canvas');
const mainMarkerGroup = L.layerGroup().addTo(map);
const markerGroup = L.layerGroup().addTo(map);

const MAP_SETTINGS = {
  TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  MINZOOM: 5
};

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

const checkMainPinMove = () => {
  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    latLngField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};

//render markers template
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
    .bindPopup(
      getPopup(object),
      {
        keepInView: true,
      });
};

//render filtered markers from array
const renderMarkers = (array) => {
  array.forEach((element) => {
    renderMarker(element);
  });
};

//clear layer with markers
const clearMarkers = () => {
  markerGroup.clearLayers();
};


//map initialize
const mapInit = (cb) => {
  map.on('load', () => {
    renderMainPinToMap();
    latLngField.value = `${mainPinStartPosition.lat}, ${mainPinStartPosition.lng}`;
    checkMainPinMove();
    cb();
  })
    .setView(centerOfCity, MAP_START_ZOOM);

  L.tileLayer(MAP_SETTINGS.TILE,
    {
      attribution: MAP_SETTINGS.COPYRIGHT,
      minZoom: MAP_SETTINGS.MINZOOM,
    },
  ).addTo(map);
};

//close map popup
const closeMapPopup = () => {
  map.closePopup();
};

//reset map to default
const mapReset = () => {
  clearMarkers();
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


export { mapInit, mapReset, closeMapPopup, renderMarkers, clearMarkers, renderMainPinToMap };
