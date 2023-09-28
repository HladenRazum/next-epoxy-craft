import Link from 'next/link';
import React from 'react';

export default function InvalidAddress() {
   return (
      <main>
         <h1 className='text-2xl'>Невалиден линк</h1>
         <Link className='link' href="/">Обратно към началната страница</Link>
      </main>
   );
}
