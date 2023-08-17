import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

export default async function Home() {
  const client = createClient();
  const { data } = await client.getByUID("home_page", "wrong-biennale");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <PrismicNextImage
        className="relative w-6/12"
        field={data.hero}
        alt="Hero"
        priority
      />
      <PrismicRichText field={data.content} />
    </main>
  )
}
