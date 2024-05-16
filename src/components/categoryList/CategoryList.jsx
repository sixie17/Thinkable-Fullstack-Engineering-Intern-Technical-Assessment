import React from 'react';

export const CategoryList = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl mb-8'>Popular Categories</h1>
      <div className='flex npm install @prisma/clientflex-col'>
        <button className='bg-red-400 text-black px-4 py-2 rounded-md border border-black hover:bg-red-800 hover:text-white transition duration-300 mt-4'>IT</button>
        <button className='bg-yellow-400 text-black px-4 py-2 rounded-md border border-black hover:bg-yellow-800 hover:text-white transition duration-300 mt-4'>Fashion</button>
      </div>
    </div>
  )
}

export default CategoryList;