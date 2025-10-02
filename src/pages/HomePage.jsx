import SearchBar from '../components/SearchBar';

function HomePage() {
  return (
    <div className='min-h-screen bg-purple-50 dark:bg-purple-900'>
      <div className='w-full p-4'>
        <SearchBar />
      </div>
    </div>
  );
}

export default HomePage;
