import { VotedEnum } from '../../data/types';
import { useState } from 'react';

export interface VoteImageProps {
    imgUrl: string | undefined;
    voteEnum: VotedEnum;
    onVote(choice: VotedEnum): void;
}

export default function VoteImage({ imgUrl, voteEnum, onVote }: VoteImageProps) {
    const [mouseOver, setMouseOver] = useState(false);
    return (
        <div
            className='flex h-full flex-col items-center gap-y-4'
            onMouseOver={() => {
                setMouseOver(true);
            }}
            onMouseOut={() => {
                setMouseOver(false);
            }}
            onClick={() => {
                onVote(voteEnum);
            }}>
            <img
                src={imgUrl as VotedEnum}
                className='m-auto aspect-square max-w-full rounded-lg object-cover'
            />
            {mouseOver && (
                <div className='absolute flex aspect-square h-full items-center justify-center rounded-lg bg-plum bg-opacity-50' />
            )}
        </div>
    );
}
