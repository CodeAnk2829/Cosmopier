import Appbar from '@/components/Appbar';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
    return <div className='p-1 text-center border-b'>
        <Appbar />
        {children}
    </div>
}