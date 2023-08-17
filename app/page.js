import Logo from '@/components/Logo';
import Viewer from '@/components/Viewer';
import { createClient } from '@/prismicio';

export default async function Home() {
  const client = createClient();
  const { data } = await client.getByUID("home_page", "wrong-biennale");

  return (
    <main className="flex flex-col items-center h-screen p-[80px] pt-0 overflow-hidden">
      <div className='absolute top-0 left-0'>
        <Logo />
      </div>
      <Viewer image={data.hero} />
    </main>
  )
}
