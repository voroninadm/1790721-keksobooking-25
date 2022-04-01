import { getData } from './ajax.js';
import { render } from './map.js';


getData((ads) => {
  render(ads);
});
