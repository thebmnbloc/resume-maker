      
    const Navbar = () => {
      
      return ( 
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                Resume<span className="text-blue-500">Maker</span>
              </span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#templates" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                Templates
              </a>
              <a href="#faq" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                FAQs
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                Contact Us
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <a 
                href="/login" 
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                Login
              </a>
              <a 
                href="/create-resume" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/25"
              >
                Create Resume
              </a>
            </div>
          </div>
        </nav> 
      )
    }

    export default Navbar;