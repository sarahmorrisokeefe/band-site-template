/**
 * Demo-content seed script.
 *
 *   npm run seed         populate the dataset with demo content
 *   npm run seed:clean   remove every document and asset the seed created
 *
 * `seed` runs `clean` first, so it is safe to re-run — fixed document `_id`s
 * and `createOrReplace` mean no duplicates, and demo image assets carry a
 * `demo-` filename prefix so `clean` can find and delete them.
 *
 * Requires an Editor-scoped `SANITY_API_TOKEN` (the default Viewer token
 * cannot write). Seeding OVERWRITES the `theme` and `band` singleton
 * documents — do not run it against a dataset that holds real content.
 */
import { writeClient } from '../lib/sanity/write-client';
import {
  demoBand,
  demoMembers,
  demoMusic,
  demoShows,
  demoTheme,
} from './demo-content';

/** A Sanity image-reference value pointing at an uploaded asset. */
type ImageRef = { _type: 'image'; asset: { _type: 'reference'; _ref: string } };

/** Fetch a deterministic placeholder image and upload it to Sanity. */
async function uploadDemoImage(
  key: string,
  width: number,
  height: number,
): Promise<ImageRef> {
  const url = `https://picsum.photos/seed/${key}/${width}/${height}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch demo image "${key}": HTTP ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await writeClient.assets.upload('image', buffer, {
    filename: `demo-${key}.jpg`,
  });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

/** Delete every demo document and demo image asset. */
async function clean(): Promise<void> {
  console.log('Removing demo documents…');
  // Documents must go before assets — Sanity refuses to delete a referenced asset.
  await writeClient.delete({ query: '*[_id match "demo-*"]' });
  await writeClient.delete('band');
  await writeClient.delete('theme');
  console.log('Removing demo image assets…');
  await writeClient.delete({
    query: '*[_type == "sanity.imageAsset" && originalFilename match "demo-*"]',
  });
  console.log('Clean complete.');
}

/** Populate the dataset with the demo homepage content. */
async function seed(): Promise<void> {
  console.warn(
    'Heads up: seeding overwrites the `theme` and `band` singleton documents.',
  );
  await clean();

  console.log('Uploading demo images…');
  const heroImage = await uploadDemoImage('hero', 1920, 1080);
  const memberPhotos = await Promise.all(
    demoMembers.map((_, index) => uploadDemoImage(`member-${index + 1}`, 600, 600)),
  );
  const musicCovers = await Promise.all(
    demoMusic.map((_, index) => uploadDemoImage(`music-${index + 1}`, 700, 700)),
  );

  console.log('Creating documents…');
  await writeClient.createOrReplace({ _id: 'theme', _type: 'theme', ...demoTheme });
  await writeClient.createOrReplace({
    _id: 'band',
    _type: 'band',
    ...demoBand,
    heroImage,
  });
  for (let index = 0; index < demoMembers.length; index += 1) {
    await writeClient.createOrReplace({
      _id: `demo-member-${index + 1}`,
      _type: 'member',
      ...demoMembers[index],
      photo: memberPhotos[index],
    });
  }
  for (let index = 0; index < demoShows.length; index += 1) {
    await writeClient.createOrReplace({
      _id: `demo-show-${index + 1}`,
      _type: 'show',
      ...demoShows[index],
    });
  }
  for (let index = 0; index < demoMusic.length; index += 1) {
    await writeClient.createOrReplace({
      _id: `demo-music-${index + 1}`,
      _type: 'music',
      ...demoMusic[index],
      coverArt: musicCovers[index],
    });
  }

  console.log(
    `Seeded: 1 band, ${demoMembers.length} members, ${demoShows.length} shows, ${demoMusic.length} releases.`,
  );
  console.log('Run `npm run dev` and open http://localhost:3000 to view the homepage.');
}

async function main(): Promise<void> {
  const isClean = process.argv.includes('--clean');
  try {
    if (isClean) {
      await clean();
    } else {
      await seed();
    }
  } catch (error) {
    console.error('Seed script failed:', error);
    process.exitCode = 1;
  }
}

void main();
