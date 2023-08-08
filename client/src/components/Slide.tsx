import { ReactNode } from 'react';

export interface SlideProps {
    children?: ReactNode;
}

export default function Slide({ children }: SlideProps) {
    return <div className='border-neutral-25 flex flex-col gap-y-6 rounded border'>{children}</div>;
}
