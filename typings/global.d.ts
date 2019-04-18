declare namespace NodeJS {
  export interface Process {
    browser: boolean;
  }
  export interface Global {
    fetch: {
      (input: RequestInfo, init?: RequestInit): Promise<Response>;
      (input: RequestInfo, init?: RequestInit): Promise<Response>;
      (input: RequestInfo, init?: RequestInit): Promise<any>;
    };
  }
}

declare interface Window extends Window {
  __APOLLO_STATE__: NormalizedCacheObject;
}

declare module '*.svg';
declare module '*.graphql' {
  const content: any;
  export default content;
}
declare module '*.gql' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
