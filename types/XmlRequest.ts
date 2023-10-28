export interface XmlRequest {
  err: string;
  verb: string;
  params: string[];
  returnVal: (err: Error | undefined, data: number | string | object | boolean | undefined) => boolean;
}
