import { ReactNode } from 'react';

interface HeadingProps {
    children: ReactNode;
    textColor: string;
    fontSize: string;
    padding?: string;
    textAlign?: string;
}

export default function Heading({ children, textColor, fontSize, padding = '', textAlign = '', }: HeadingProps) {
    return <h1 className={`${textColor} font-main ${fontSize} ${padding} ${textAlign}`}>{children}</h1>;
}
