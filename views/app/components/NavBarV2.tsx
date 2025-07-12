import { useState } from "react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real app, you would dispatch a search action or navigate
    alert(`Searching for: "${searchTerm}"`); // Using alert for demo, replace with proper UI feedback
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-b-xl shadow-lg border-b border-white border-opacity-20 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Brand Name */}
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <a href="#" className="text-3xl font-extrabold text-white tracking-wider hover:text-purple-300 transition-colors duration-300">
            YourBrand
          </a>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full md:w-1/2 lg:w-1/3 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pr-10 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-300 transition-colors duration-300">
            {/* Search Icon (Lucide-react equivalent or simple SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;