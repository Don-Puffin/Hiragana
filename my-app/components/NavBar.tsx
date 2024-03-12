import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="flex justify-between p-5 bg-blue-500 text-white">
            <div className="flex space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/hiragana" className="hover:underline">Hiragana</Link>
                <Link href="/katakana" className="hover:underline">Katakana</Link>
                <Link href="/kanji" className="hover:underline">Kanji</Link>
            </div>
            <div className="flex space-x-4">
                <Link href="/login" className="hover:underline">Login</Link>
                <Link href="/profile" className="hover:underline">Profile</Link>
                <Link href="/register" className="hover:underline">Register</Link>
            </div>
        </nav>
    );
}

export default NavBar;