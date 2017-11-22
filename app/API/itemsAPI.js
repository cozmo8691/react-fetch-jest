import 'whatwg-fetch';
import settings from '../config/settings';

export default {
  loadData() {
    return fetch(settings.itemsURL)
      .then(function(response) {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
    });
  }
};