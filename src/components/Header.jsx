import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className='h-12 bg-white shadow-sm border-b border-gray-200'>
      <div className='h-full flex items-center justify-between px-4'>
        <Link
          to='/'
          className='text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200'
        >
          716Finder
        </Link>

        <Link
          to='/admin'
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
          Add Lost/Found Pet
        </Link>
      </div>
    </header>
  );
}

export default Header;
