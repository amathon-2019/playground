import { Controller, Post, Required } from 'ts-decorator-express/dist/src/';
import { NextFunction, Request, Response } from 'express';

import { getRemoteSchema } from '../../core/getSchema';
import { printToFile } from '../../core/printToFile';
import { executeCLI, readGQL } from '../../core/schemaToTs';
import { S3 } from '../services/s3';

const s3 = new S3();
@Controller('/playground')
export class Playground {
  @Post('')
  async createTypes(@Required.Body(['url']) req: Request, res: Response, next: NextFunction) {
    try {
      const schema = await getRemoteSchema(req.body.url, { method: 'POST' });
      if (schema.status === 'err') {
        throw schema.message;
      }
      printToFile(schema.schema);
      executeCLI();
      const gqlFile = readGQL();
      const s3Result = await this.uploadS3(
        'playground-graphql-schema-bucket/' + req.hostname,
        gqlFile,
      );
      const url = `https://playground-graphql-schema-bucket.s3.ap-northeast-2.amazonaws.com/${req.hostname}/${s3Result.Key}.ts`;
      return res.status(200).json({
        status: 200,
        url,
      });
    } catch (error) {
      return res.status(500).json({
        status: 200,
        error,
      });
    }
  }

  private async uploadS3(bucket: string, obj: any) {
    try {
      const result = await s3.jsonPutObject(bucket, obj);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
