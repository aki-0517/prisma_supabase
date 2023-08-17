import { PrismaClient, Post } from '@prisma/client';

async function fetchData() {
  const prisma = new PrismaClient();
  return await prisma.post.findMany();
}

export default async function Home() {
  const posts: Post[] = await fetchData();

  return (
    <main className='p-16'>
      <div className='bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden'>
        <table className='w-full text-sm text-gray-600'>
          <thead className='bg-gray-100 border-b border-gray-200'>
            <tr>
              <th className='px-6 py-3 w-1/4 text-left'>Created</th>
              <th className='px-6 py-3 w-1/4 text-left'>Title</th>
              <th className='px-6 py-3 w-1/2 text-left'>Content</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {posts.map((post) => (
              <tr key={post.id} className='hover:bg-gray-50'>
                <td className='px-6 py-3'>
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-3'>{post.title}</td>
                <td className='px-6 py-3'>{post.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}