import React from 'react';
import Image from 'next/image';

export const Featured = () => {
  return (
    <div className='mt-32'>
      <h1 className='text-8xl'>
        <b>Hi it's Yasser Sakine Here</b>
      </h1>
      <div className='flex mt-60 items-center gap-20'>
        <div className='flex-1 h-96 max-w-full relative'>
          <img src="/Rufus.jpeg"/>
        </div>
        <div className='flex-1'>
          <h1 className='text-4xl'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni amet, odit explicabo aspernatur.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium delectus cum voluptates odio soluta cumque, voluptatum natus sit officiis et iusto doloremque omnis dolorem, aliquam enim modi ducimus laboriosam vero!laboriosam
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae laborum suscipit excepturi dolorem minima id magni mollitia, ad, illo vero aspernatur est voluptatibus ducimus neque fugiat aperiam nam in. Quidem!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed magnam aut necessitatibus assumenda hic illo provident, unde voluptates delectus dolorem placeat sit! Nesciunt odio perferendis libero doloremque? Accusamus, ut. Odio!
          </p>
          <button className='bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-black hover:text-white transition duration-300'>Read More</button>
        </div>
      </div>
    </div>
  )
}
export default Featured