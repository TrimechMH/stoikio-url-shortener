import { UrlShorten } from '../entities/url-shorten';

export interface UrlShortenRepository {
  save(urlShorten: UrlShorten): Promise<void>;
  findByShortUrl(shortUrl: string): Promise<UrlShorten | null>;
  findByOriginalUrl(originalUrl: string): Promise<UrlShorten | null>;
  findByShortUrlAndIncrement(originalUrl: string): Promise<UrlShorten | null>;
}
