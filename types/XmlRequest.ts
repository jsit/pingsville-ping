export interface XmlRequest {
  verb?: string;
  params?: string[];
  returnVal: (err: Error | undefined, data: string) => Response;
  httpRequest: {
    client: string;
  };
}
