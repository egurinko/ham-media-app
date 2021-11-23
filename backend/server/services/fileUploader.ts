import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const client = new S3Client({ region: 'us-east-1' });

export const uploadFile = async (
  fileName: string,
  fileStream: any
): Promise<string> => {
  try {
    const parallelUploads3 = new Upload({
      /**
       * This is the data that is uploaded.
       */
      params: {
        Bucket: process.env['AWS_BUCKET_NAME'],
        Key: fileName,
        Body: fileStream,
      },
      /**
       * A service client.
       * This the target where we upload data.
       */
      client,
      /**
       * The size of the concurrent queue manager to upload parts in parallel. Set to 1 for synchronous uploading of parts. Note that the uploader will buffer at most queueSize * partSize bytes into memory at any given time.
       * default: 4
       */
      queueSize: 4,
      /**
       * Default: 5 mb
       * The size in bytes for each individual part to be uploaded. Adjust the part size to ensure the number of parts does not exceed maxTotalParts. See 5mb is the minimum allowed part size.
       */
      // partSize: 5,
      /**
       * Default: false
       * Whether to abort the multipart upload if an error occurs. Set to true if you want to handle failures manually. If set to false (default)
       * the upload will drop parts that have failed.
       */
      leavePartsOnError: false,
      /**
       * The tags to apply to the object.
       */
      tags: [],
    });

    await parallelUploads3.done();

    return `https://${
      process.env['AWS_BUCKET_NAME']
    }.s3.amazonaws.com/${encodeURI(fileName)}`;
  } catch (error) {
    return Promise.reject(error);
  }
};
