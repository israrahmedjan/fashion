export default function Mainfooter() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Left Section: Logo or Brand Name */}
          <div className="text-lg font-semibold">
            <p>&copy; 2025 MyWebsite. All Rights Reserved.</p>
          </div>
  
          {/* Center Section: Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/services" className="hover:text-gray-400">
              Services
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
          </div>
  
          {/* Right Section: Social Media */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    );
  }
  