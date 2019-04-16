declare namespace NodeJS {
  export interface Process {
    browser: boolean;
  }
  export interface Global {
    fetch: { (input: RequestInfo, init?: RequestInit): Promise<Response>; (input: RequestInfo, init?: RequestInit): Promise<Response>; (input: RequestInfo, init?: RequestInit): Promise<any>; };
  }
}

declare interface Window extends Window {
  __APOLLO_STATE__: NormalizedCacheObject;
}
