import { Model } from '../interfaces/model.ts';
import { HTTP } from '../enums/httpTypes.ts';

const port = 52188;
// const hostname = '190.4.176.147';
const hostname = 'localhost';
const service = 'WSProductService.svc';
const client = 'https://localhost:3001';
export const WSProductService = async (headers: any, params: any): Promise<Model> => {
  return {
    HTTP: {
      GetCategoryListing: {
        // Get Categories
        route: `http://${hostname}:${port}/${service}/GetCategoryListing(${params.CategoryID},${params.Offset},${params.ItemsPerPage})`, // this is like a relay  (http://190.4.176.147:${port}/very/long/unkown/call)
        cors: {
          // we want to append these when we relay the signal back to the caller...
          'Access-Control-Allow-Origin': client,
          'Access-Control-Allow-Headers': client,
        },
        type: HTTP.GET,
        decode: false,
      },
      UpdateCart: {
        route: `http://${hostname}:${port}/${service}/UpdateCart`, // this is like a relay  (http://190.4.176.147:${port}/very/long/unkown/call)
        cors: {
          // we want to append these when we relay the signal back to the caller...
          'Access-Control-Allow-Origin': client,
          'Access-Control-Allow-Headers': client,
        },
        type: HTTP.POST,
        decode: true,
      },
    },
  };
};
