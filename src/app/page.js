import Dessert from '@/components/Dessert';
import { promises as fs } from 'fs';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  const data = JSON.parse(file);
  // const cart = new Map();

  return (
    <main className="bg-red-50">
      <div className="w-10/12 lg:w-full lg:p-4 xl:w-10/12 mx-auto pt-16 ">
        <Dessert data={data} />
      </div>
    </main>
  );
}
