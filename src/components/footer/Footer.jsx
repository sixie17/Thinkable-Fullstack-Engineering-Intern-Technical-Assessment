import React from 'react';

export const Footer = () => {
  return (
    <div className="bg-blue-900 text-white text-center py-4">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-white hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="text-white hover:text-gray-300">Terms of Service</a>
          <a href="#" className="text-white hover:text-gray-300">Contact Us</a>
        </div>
      </div>
    </div>
  )
}
export default Footer