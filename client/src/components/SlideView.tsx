import { useState } from 'react';
import { ImageData, VotedEnum } from '../data/types';
import Slide from './Slide';
import VoteImage from './VoteImage';
import axios from 'axios';

export interface SlideViewProps {
    title: string | undefined;
    description: string | undefined;
    imageOne: ImageData;
    imageTwo: ImageData;
    _id: string | undefined;
}

export default function SlideView({ title, description, imageOne, imageTwo, _id }: SlideViewProps) {
    const [votedFor, setVote] = useState('');

    function onVote(imageEnum: VotedEnum) {
        setVote(imageEnum);

        axios
            .patch(`/voteslide`, {
                _id: _id,
                votedFor: imageEnum,
            })
            .then(res => console.log(res.data));
    }

    return (
        <Slide>
            {title && <div className='text-lg'>{title}</div>}
            {description && <div className='text-sm'>{description}</div>}
            <div className='flex justify-between'>
                <div className='relative flex flex-col items-center gap-y-4'>
                    <VoteImage
                        imgUrl={imageOne.url as string}
                        voteEnum={VotedEnum.IMAGE1}
                        onVote={onVote}
                    />

                    {votedFor === 'IMAGE1' && (
                        <div className='absolute inset-0 flex h-96 w-96 items-center justify-center bg-fuchsia-500 bg-opacity-50'>
                            <p className='text-xl font-bold text-white'>Voted for 1!</p>
                        </div>
                    )}

                    {votedFor !== 'IMAGE1' && votedFor !== '' && (
                        <div className='absolute inset-0 flex h-96 w-96 items-center justify-center bg-slate bg-opacity-50'>
                            <p className='text-xl font-bold text-white'>Not voted for 1</p>
                        </div>
                    )}

                    {imageOne.caption && <div className='text-sm'>{imageOne.caption}</div>}
                </div>
                <div className='relative flex flex-col items-center gap-y-4'>
                    <VoteImage
                        imgUrl={imageTwo.url as string}
                        voteEnum={VotedEnum.IMAGE2}
                        onVote={onVote}
                    />

                    {votedFor === 'IMAGE2' && (
                        <div className='absolute inset-0 flex h-96 w-96 items-center justify-center bg-fuchsia-500 bg-opacity-50'>
                            <p className='text-xl font-bold text-white'>Voted for 2!</p>
                        </div>
                    )}

                    {votedFor !== 'IMAGE2' && votedFor !== '' && (
                        <div className='absolute inset-0 flex h-96 w-96 items-center justify-center bg-slate bg-opacity-50'>
                            <p className='text-xl font-bold text-white'>Not voted for 2</p>
                        </div>
                    )}

                    {imageTwo.caption && <div className='text-sm'>{imageTwo.caption}</div>}
                </div>
            </div>
        </Slide>
    );
}
