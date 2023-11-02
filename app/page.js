import LogoFull from '@/components/LogoFull';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import Link from 'next/link';
import wrong from 'public/wrong.png'

function baseRandom(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}

function shuffle(array, size) {
  var index = -1,
      length = array.length,
      lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
        value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}

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
  const images = artists.reduce((acc, cur) => acc.concat(cur.data.images.map((img, i) =>({idx: i, artist: cur.uid, ...img}))), []);
  const chunks = chunk(shuffle(images), Math.ceil(images.length / 4))

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
        <Link href="https://thewrong.org" target='_blank'>
          <Image
            className="inline-block w-[200px] h-auto relative right-1 mt-[20px]"
            src={wrong}
            alt="The Wrong Biennale"
          />
        </Link>
        <div className='mt-[20px] pb-[20px] flex flex-wrap'>
          {artists.map((artist, i) => (
            <Link className="font-semibold underline mr-5" key={i} href={`/${artist.uid}`}>@{artist.uid}</Link>
          ))}
        </div>
      </div>
      <div className="hidden lg:grid col-span-7 grid-cols-4 gap-[20px] py-[20px] max-h-screen overflow-auto hp-images">
        {chunks.map((chunk, i) => (
          <div key={`chunk_${i}`}>
            {chunk.map((image, j) => (
              <Link key={`${i}_${j}`} href={`/${image.artist}?img=${image.idx}`}>
                <PrismicNextImage
                    className="max-w-full w-auto mb-[20px]"
                    field={image.image}
                    priority={j < 4}
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className='site-gradient h-screen w-[89px] lg:w-[227px] fixed top-0 left-0'></div>
    </main>
  )
}
