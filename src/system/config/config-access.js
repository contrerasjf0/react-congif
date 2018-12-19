import get from 'lodash/get';

import config from '../../config';

class ConfigAccess {

  constructor() {
    this.config = config;
  }

  get(key) {
    return get(this.config, key);
  }
}

export const configAccess = new ConfigAccess();