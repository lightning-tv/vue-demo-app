import api from '..';
import { convertItemsToTiles, chunkArray } from '../formatters/ItemFormatter';

const cache = new Map();
const leftoverTiles = new Map();

export default function (filter: string) {
  return (pageIndex: number): Promise<any> => {
    const url = `/trending/${filter}/week?page=${pageIndex}`;
    if (cache.has(url)) {
      return cache.get(url);
    }

    const result = api.get(url).then((trending) => {
      const results = trending.results.filter((r) => !r.adult);
      const tiles = (
        leftoverTiles.has(filter) ? leftoverTiles.get(filter) : []
      ).concat(convertItemsToTiles(results));
      const chunks = chunkArray(tiles);
      if (chunks[chunks.length - 1].length < 7) {
        leftoverTiles.set(filter, chunks.pop());
      } else {
        leftoverTiles.delete(filter);
      }
      return chunks;
    });

    cache.set(url, result);
    return result;
  };
}
