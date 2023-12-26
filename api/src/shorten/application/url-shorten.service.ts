import { UrlShorten } from '../domain/entities/url-shorten';
import { UrlShortenDto } from './url-shorten.dto';

export interface UrlShortenService {
  generateShortenUrl(shortenUrlDto: UrlShortenDto): Promise<UrlShorten>;
  incrementCountingAndRetrieveOriginalUrl(
    shortUrl: string,
  ): Promise<UrlShorten | null>;
  getShortenUrl(shortUrl: string): Promise<UrlShorten | null>;
}
