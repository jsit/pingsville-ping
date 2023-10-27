import type { XmlData } from './index.ts';

export interface XmlRequest {
  err: string;
  verb: string;
  params: string[];
  returnVal: (err: Error | undefined, data: XmlData | undefined) => boolean;
}
