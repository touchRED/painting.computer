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
    <main className="grid grid-cols-12 gap-[20px] h-screen px-[20px] py-0 lg:overflow-hidden">
      <div className="col-span-12 lg:col-span-5 text-lg pt-[80px] lg:pt-[100px] pb-[20px] max-h-screen lg:overflow-auto hp-content">
        <div style={{
          filter: 'drop-shadow(0px 0px 8px #000)',
          padding: '0 0 0 15px',
          position: 'absolute',
          left: '5px',
          top: '20px'
        }}>
          <LogoFull className="w-full lg:w-[385px]" />
        </div>
        <PrismicRichText field={data.content} />
        <div className='mt-[20px] pb-[80px] lg:pb-0 flex flex-wrap'>
          {artists.map((artist, i) => (
            <Link className="font-semibold mr-5" key={i} href={`/${artist.uid}`}>@{artist.uid}</Link>
          ))}
        </div>
      </div>
      <div className="hidden lg:grid col-span-7 grid-cols-4 gap-[20px] py-[20px] max-h-screen overflow-auto hp-images">
        {chunks.map((chunk, i) => (
          <div key={`chunk_${i}`}>
            {chunk.map((image, j) => (
              <PrismicNextImage
                  className="max-w-full w-auto mb-[20px]"
                  field={image.image}
                  key={`${i}_${j}`}
                  priority={j < 4}
              />
            ))}
          </div>
        ))}
      </div>
      <div className='site-gradient h-screen w-[89px] lg:w-[227px] fixed top-0 left-0'></div>
    </main>
  )
}
