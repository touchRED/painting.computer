import LogoFull from '@/components/LogoFull';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';

const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

export default async function Home() {
  const client = createClient();
  const { data } = await client.getByUID("home_page", "wrong-biennale");
  const artists = await client.getAllByType('artist')
  // console.log("artists", artists)
  const images = artists.reduce((acc, cur, i) => acc.concat(cur.data.images), []);
  // artists.forEach(artist => images = images.concat(artist.data.images))
  console.log(images)
  const chunks = chunk(images, Math.ceil(images.length / 4))

  return (
    <main className="grid grid-cols-12 gap-[20px] h-screen px-[20px] py-0">
      <div className="col-span-5 text-lg py-[20px] max-h-screen overflow-auto hp-content">
        <LogoFull className="w-[385px] mb-[20px]" />
        <PrismicRichText field={data.content} />
        <div className='mt-[20px]'>
          {artists.map((artist, i) => (
            <Link className="font-semibold mr-5" key={i} href={`/${artist.uid}`}>@{artist.uid}</Link>
          ))}
        </div>
      </div>
      <div className="col-span-7 grid grid-cols-4 gap-[20px] py-[20px] max-h-screen overflow-auto hp-images">
        {chunks.map((chunk, i) => (
          <div key={`chunk_${i}`}>
            {chunk.map((image, j) => (
              <PrismicNextImage
                  className="max-w-full w-auto mb-[20px]"
                  field={image.image}
                  key={`${i}_${j}`}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}
