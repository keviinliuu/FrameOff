import { useState, useEffect } from 'react';
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
    const [voted, didVote] = useState(false);
    const [votedFor, setVote] = useState('NOT_VOTED');

    const [votesImage1, setVotesImage1] = useState<number | null>(null);
    const [votesPercent1, setVotesPercent1] = useState<number | null>(null);
    const [votesImage2, setVotesImage2] = useState<number | null>(null);
    const [votesPercent2, setVotesPercent2] = useState<number | null>(null);

    const voteStatus = localStorage.getItem(_id!);
    console.log('Vote status: ' + voteStatus);

    useEffect(() => {
        if (voteStatus != null && voted == false) {
            didVote(true);
            setVote(voteStatus);
            const requestData = async () => {
                try {
                    const res = await axios.get('/getvotes/' + _id!);
                    const { votesImage1, votesPercent1, votesImage2, votesPercent2 } = res.data;
                    setSlideData(votesImage1, votesPercent1, votesImage2, votesPercent2);
                } catch (error) {
                    console.error('Error fetching votes:', error);
                }
            };
            requestData();
        }
    });

    async function onVote(imageEnum: VotedEnum) {
        setVote(imageEnum);

        try {
            const res = await axios.patch('/voteslide', {
                _id: _id,
                votedFor: imageEnum,
            });

            const { votesImage1, votesPercent1, votesImage2, votesPercent2 } = res.data;
            setSlideData(votesImage1, votesPercent1, votesImage2, votesPercent2);
            didVote(true);
            localStorage.setItem(_id!, imageEnum);
        } catch (error) {
            console.error('Error voting:', error);
        };
    }

    function setSlideData(
        votesImage1: number,
        votesPercent1: number,
        votesImage2: number,
        votesPercent2: number,
    ) {
        setVotesImage1(votesImage1);
        setVotesPercent1(votesPercent1);
        setVotesImage2(votesImage2);
        setVotesPercent2(votesPercent2);
    }

    return (
        <Slide>
            {title && <div className='text-lg'>{title}</div>}
            {description && <div className='text-sm'>{description}</div>}
            <div className='flex justify-between space-x-20'>
                <div className='relative flex flex-col items-center gap-y-4'>
                    <div className='relative flex flex-row items-end space-x-2'>
                        <VoteImage
                            imgUrl={imageOne.url as string}
                            voteEnum={VotedEnum.IMAGE1}
                            onVote={onVote}
                        />
                        {voted && (
                            <div>
                                {votedFor === 'IMAGE1' ? (
                                    <div className='flex h-96 items-end'>
                                        <div className='absolute inset-0 flex h-96 w-96 items-center justify-center border-4 border-fushcia bg-fuchsia-500 bg-opacity-50'>
                                            <p className='text-main text-xl text-moonbeam'>
                                                {votesImage1} votes, {votesPercent1}%
                                            </p>
                                        </div>

                                        <div
                                            className={`w-6 bg-fushcia`}
                                            style={{ height: `${votesPercent1}%` }}></div>
                                    </div>
                                ) : (
                                    <div className='flex h-96 items-end'>
                                        <div className='absolute inset-0 flex h-96 w-96 items-center justify-center bg-slate bg-opacity-50'>
                                            <p className='text-main text-xl text-moonbeam'>
                                                {votesImage1} votes, {votesPercent1}%
                                            </p>
                                        </div>

                                        <div
                                            className={`h-1/2 w-6 bg-slate`}
                                            style={{ height: `${votesPercent1}%` }}></div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {imageOne.caption && <div className='text-sm'>{imageOne.caption}</div>}
                </div>
                <div className='relative flex flex-col items-center gap-y-4'>
                    <div className='relative flex flex-row items-end space-x-2'>
                        {voted && (
                            <div>
                                {votedFor === 'IMAGE2' ? (
                                    <div className='flex h-96 items-end'>
                                        <div
                                            className={`w-6 bg-fushcia`}
                                            style={{ height: `${votesPercent2}%` }}></div>

                                        <div className='absolute right-0 top-0 flex h-96 w-96 items-center justify-center border-4 border-fushcia bg-fuchsia-500 bg-opacity-50'>
                                            <p className='text-main text-xl text-moonbeam'>
                                                {votesImage2} votes, {votesPercent2}%
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex h-96 items-end'>
                                        <div
                                            className={`w-6 bg-slate`}
                                            style={{ height: `${votesPercent2}%` }}></div>

                                        <div className='absolute right-0 top-0 flex h-96 w-96 items-center justify-center bg-slate bg-opacity-50'>
                                            <p className='text-main text-xl text-moonbeam'>
                                                {votesImage2} votes, {votesPercent2}%
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <VoteImage
                            imgUrl={imageTwo.url as string}
                            voteEnum={VotedEnum.IMAGE2}
                            onVote={onVote}
                        />
                    </div>

                    {imageTwo.caption && <div className='text-sm'>{imageTwo.caption}</div>}
                </div>
            </div>
        </Slide>
    );
}
