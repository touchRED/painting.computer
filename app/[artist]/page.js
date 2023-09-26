import Logo from '@/components/Logo';
import Viewer from '@/components/Viewer';
import { createClient } from '@/prismicio';

export default async function Home({ params }) {
  const client = createClient();
  const { data } = await client.getByUID("artist", params.uid);

  return (
    <main className="flex flex-col items-center h-screen p-[80px] pt-0 overflow-hidden">
      <div className='absolute top-0 left-0'>
        <Logo />
      </div>
      <Viewer image={data.images[0].image} />
    </main>
  )
}

export async function generateStaticParams() {
  const client = createClient()

  const artists = await client.getAllByType('artist')

  return artists.map((artist) => {
    return { uid: artist.uid }
  })
}
