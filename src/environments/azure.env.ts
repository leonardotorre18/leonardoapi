import { registerAs } from "@nestjs/config";

export default registerAs(
  'azure',
  () => ({
    blobStorage: {
      connectionString: process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING
    }
  })
)