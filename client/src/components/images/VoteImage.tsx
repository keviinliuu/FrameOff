import { VotedEnum } from '../../data/types';
import { useState, useRef } from 'react';
import anime from 'animejs';
export interface VoteImageProps {
    imgUrl: string | undefined;
    voteEnum: VotedEnum;
    onVote(choice: VotedEnum): void;
}

export default function VoteImage({ imgUrl, voteEnum, onVote }: VoteImageProps) {
    const [mouseOver, setMouseOver] = useState(false);
    const highlightRef = useRef(null);
    anime({
        targets: highlightRef.current,
        duration: 100,
        opacity: 1,
        easing: 'easeInOutSine',
    });
    return (
        <div
            className='flex flex-col items-center'
            onMouseOver={() => {
                setMouseOver(true);
            }}
            onClick={() => {
                onVote(voteEnum);
            }}>
            <img
                src={imgUrl as VotedEnum}
                className='m-auto aspect-square max-w-full rounded-lg object-cover'
            />
            {mouseOver && (
                <div
                    className='absolute flex aspect-square h-full items-center justify-center rounded-lg bg-plum bg-opacity-50 opacity-0'
                    ref={highlightRef}
                    onMouseOut={() => {
                        anime({
                            targets: highlightRef.current,
                            duration: 100,
                            opacity: 0,
                            easing: 'easeInOutSine',
                            complete: function () {
                                setMouseOver(false);
                            },
                        });
                    }}
                />
            )}
        </div>
    );
}
