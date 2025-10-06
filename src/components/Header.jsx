import './Header.css';

function Header() {
  return (
    <header className='h-12 bg-white shadow-sm border-b border-gray-200'>
      <div className='h-full flex items-center pl-4'>
        <h1 className='text-2xl font-bold text-gray-900'>716Finder</h1>
      </div>
    </header>
  );
}

export default Header;
