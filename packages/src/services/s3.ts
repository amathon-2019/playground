import * as AWS from 'aws-sdk';
import moment from 'moment';

export class S3 {
  private readonly s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      region: 'ap-northeast-2',
    });
  }

  public async jsonPutObject(
    Bucket: string,
    object: any,
    key?: string,
    options?: any,
  ): Promise<any> {
    const objectKey = key ? key : moment().milliseconds() + moment().format('ssmmhhDDMMYY');
    try {
      const parameter = {
        Body: typeof object === 'string' ? object : Buffer.from(JSON.stringify(object)),
        Bucket,
        Key: `${objectKey}.ts`,
        ServerSideEncryption: 'AES256',
        Tagging: 'key1=value1',
        ...options,
      };
      const result: any = await this.s3.putObject(parameter).promise();

      result.Key = objectKey;
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('S01');
    }
  }
}
