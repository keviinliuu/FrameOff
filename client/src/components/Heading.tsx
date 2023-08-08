import { ReactNode } from 'react';

interface HeadingProps {
    children: ReactNode;
    textColor: string;
    fontSize: string;
    padding?: string;
}

export default function Heading({ children, textColor, fontSize, padding = '' }: HeadingProps) {
    return <h1 className={`${textColor} font-main ${fontSize} ${padding}`}>{children}</h1>;
}
