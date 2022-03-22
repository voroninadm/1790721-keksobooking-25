import { generateData } from './generate-data.js';
import { getPopup } from './popup.js';

const latLngField = document.querySelector('[name="address"]');
const resetButton = document.querySelector('[type="reset"]');

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const MAP_START_ZOOM = 12;
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

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 6,
  },
).addTo(map);


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

//=======MAP INITIALIZE
const mapInit = (cb) => {
  map.on('load', () => {
    setTimeout(cb, 500);
    mainPinMarker.addTo(markerGroup);
    latLngField.value = `${mainPinStartPosition.lat}, ${mainPinStartPosition.lng}`;
    mainPinMarker.on('moveend', (evt) => {
      const lat = evt.target.getLatLng().lat;
      const lng = evt.target.getLatLng().lng;
      latLngField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    });
    const adsArray = generateData(10);
    adsArray.forEach((ad) => {
      renderMarker(ad);
    });
  })
    .setView({
      lat: centerOfCity.lat,
      lng: centerOfCity.lng
    }, MAP_START_ZOOM);
};

// handler. on reset
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  latLngField.value = `${mainPinStartPosition.lat}, ${mainPinStartPosition.lng}`;
  mainPinMarker.setLatLng({
    lat: mainPinStartPosition.lat,
    lng: mainPinStartPosition.lng,
  });
  map.setView({
    lat: centerOfCity.lat,
    lng: centerOfCity.lng,
  }, MAP_START_ZOOM);
});

export { mapInit };
