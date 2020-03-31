/* eslint-disable @typescript-eslint/no-empty-interface */

export interface Config {
  db: {
    uri: string;
    name: string;
    secret: string;
    user: string;
  };
  port: number | string;
  secret: string;
}
