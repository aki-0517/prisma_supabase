import Link from 'next/link';

export default function ResultNavBar() {
  return (
    <nav className="bg-blue-600 p-4 text-white sticky top-0">
      <ul className="flex space-x-4">
        <li><Link href="/games">一覧</Link></li>
        <li><Link href="/resultInput">入力</Link></li>
        <li><Link href="/edit">編集</Link></li>
      </ul>
    </nav>
  );
}
