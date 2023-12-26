import { UrlShorten } from '../domain/entities/url-shorten';

export interface GetShortenUrlService {
  getShortenUrl(
      shortUrl: string,
  ): Promise<UrlShorten | null>;
}