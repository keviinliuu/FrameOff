import { ReactNode } from 'react';

export interface SlideProps {
    children?: ReactNode;
}

export default function Slide({ children }: SlideProps) {
    return <div className='flex p-6 w-full flex-col gap-y-8 items-center'>{children}</div>;
}
