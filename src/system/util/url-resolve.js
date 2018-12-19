import urljoin from 'url-join';

export default class UrlResolver {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  resolve() {
    return urljoin(this.baseUrl, ...arguments);
  }
}