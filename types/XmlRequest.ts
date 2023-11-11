export interface XmlRequest {
  err: string;
  verb?: string;
  params?: string[];
  returnVal: (err: Error | undefined, data: string) => Response;
}
