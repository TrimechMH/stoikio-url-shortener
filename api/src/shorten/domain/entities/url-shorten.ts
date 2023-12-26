export class UrlShorten {
  constructor(
    public originalUrl: string,
    public shortUrl: string,
    public count: number = 0,
  ) {}
}
