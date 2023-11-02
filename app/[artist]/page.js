import Logo from '@/components/Logo';
import Viewer from '@/components/Viewer';
import { createClient } from '@/prismicio';
import Link from 'next/link';

export default async function Home({ params }) {
  const client = createClient();
  const { data, uid } = await client.getByUID("artist", params.artist);

  return (
    <main className="grid grid-cols-12 gap-[20px] h-screen px-[20px] pt-[12px] pb-[40px] overflow-hidden">
      <div style={{
          filter: 'drop-shadow(0px 0px 8px #000)',
        }} className='absolute top-0 left-0 my-[4px] mx-[12px]'>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className='col-span-12 lg:col-start-3 lg:col-span-10 flex items-center lg:block'>
        <Viewer
          images={data.images}
          handle={uid}
        />
      </div>
      <div className='site-gradient-viewer w-screen h-[89px] lg:h-[159px] absolute top-0 left-0'></div>
    </main>
  )
}

export async function generateStaticParams() {
  const client = createClient()

  const artists = await client.getAllByType('artist')

  return artists.map((artist) => {
    return { artist: artist.uid }
  })
}
