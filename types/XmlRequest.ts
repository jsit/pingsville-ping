export interface XmlRequest {
  verb?: string;
  params?: string[];
  returnVal: (err: Error | undefined, data: string) => Response;
  httpRequest: Record<string, any>;
}
