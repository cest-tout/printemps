import Album from '../models/Album';

export async function listAlbums(pageNumber, itemCount) {
  try {
    if (pageNumber < 0 || itemCount < 1) {
      throw `Invalid params; pageNumber: ${pageNumber}, itemCount: ${itemCount}`;
    }

    return await Album.find()
      .sort({ artist: 1, year: 1 })
      .skip(pageNumber * itemCount)
      .limit(itemCount);
  } catch (e) {
    console.error(e);
    return e;
  }
}

export async function importAlbums(albumMap) {
  try {
    const albumKeys = Object.keys(albumMap);

    return await Album.bulkWrite(
      albumKeys.map(key => {
        const { artist, title, ...update } = albumMap[key];
        return {
          updateOne: {
            filter: { artist, title },
            update: {
              $setOnInsert: { artist, title },
              $set: update,
            },
            upsert: true,
          },
        };
      }),
    );
  } catch (e) {
    console.error(e);
  }
}
