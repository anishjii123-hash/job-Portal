import React from "react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      
        <div>
          <h2 className="text-xl font-semibold text-white">JobPortal</h2>
          <p className="mt-3 text-sm text-gray-400">
            Find your dream job or hire the best talent.  
            Trusted by thousands of companies.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Jobs</li>
            <li className="hover:text-white cursor-pointer">Companies</li>
            <li className="hover:text-white cursor-pointer">Post a Job</li>
            <li className="hover:text-white cursor-pointer">Career Tips</li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">💼</a>
            <a href="#" className="hover:text-white">📸</a>
             
          </div>
              <div>
                 <p className="space-y-2 text-sm  font-medium text-white mb-3">+91-9650919277</p>
              
                </div>     
        </div>
        

      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

