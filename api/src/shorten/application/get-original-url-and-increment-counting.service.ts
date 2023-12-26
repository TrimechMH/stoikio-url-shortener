import { UrlShorten } from '../domain/entities/url-shorten';

export interface GetOriginalUrlAndIncrementCountingService {
    incrementCountingAndRetrieveOriginalUrl(shortUrl: string): Promise<UrlShorten | null>;
}