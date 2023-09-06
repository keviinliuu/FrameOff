import { useState, useEffect } from 'react';
import { ImageData, VotedEnum } from '../data/types';
import Slide from './Slide';
import VoteImage from './VoteImage';
import axios from 'axios';
import Checkmark from '../assets/checkmark.svg'
import EmptyCircle from '../assets/empty-circle.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {faCircle} from '@fortawesome/free-regular-svg-icons';

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
            {title && <div className='text-3xl text-blush'>{title}</div>}
            {description && <div className='text-sm text-blush'>{description}</div>}
            <div className='flex w-full items-center justify-center gap-x-16'>
                <div className='flex flex-col items-center gap-y-8' style={{ width: `30%` }}>
                    <div className='relative flex w-full flex-row gap-x-4'>
                        <VoteImage
                            imgUrl={imageOne.url as string}
                            voteEnum={VotedEnum.IMAGE1}
                            onVote={onVote}
                        />
                        {voted && (
                            <div
                                className={`absolute left-0 flex aspect-square h-full items-end justify-center rounded-lg bg-opacity-50 ${
                                    votedFor == VotedEnum.IMAGE1
                                        ? 'border-4 border-fushcia bg-plum'
                                        : 'bg-midnight'
                                }`}>
                                <div className='w-5/6 m-4 flex flex-row justify-evenly space-between items-center rounded-lg bg-midnight' style={{height:'30%'}}>
                                    <div className='flex flex-col right-0 justify-center mt-2 gap-2 items-center'>
                                        <p className='text-main text-xl text-moonbeam'>
                                            {`${votesImage1} votes`}
                                        </p>
                                        <p className={`text-main text-7xl ${votedFor == VotedEnum.IMAGE1 ? 'text-fushcia' : 'text-charcoal'}`}>
                                            {`${votesPercent1}%`}
                                        </p>
                                    </div>
                                    {votedFor == VotedEnum.IMAGE1 ? (
                                        <FontAwesomeIcon icon={faCheck} className={`text-fushcia h-3/4`}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faCircle} className={`text-slate h-3/4`}/>

                                    )}
                                </div>
                            </div>
                        )}
                        <div className='flex flex-col justify-end'>
                            <div
                                className={`w-8 ${
                                    votedFor == VotedEnum.IMAGE1 ? 'bg-fushcia' : 'bg-charcoal'
                                }`}
                                style={{ height: `${votesPercent1}%` }}></div>
                        </div>
                    </div>
                    {imageOne.caption && (
                        <div className='text-3xl text-blush'>{imageOne.caption}</div>
                    )}
                </div>
                <div className='flex flex-col items-center gap-y-4'>
                    <div className='flex items-center text-3xl text-blush'>VS</div>
                </div>
                <div className='flex w-1/4 flex-col items-center gap-y-8' style={{ width: `30%` }}>
                    <div className='relative flex flex-row gap-x-4'>
                        <div className='flex flex-col justify-end'>
                            <div
                                className={`w-8 ${
                                    votedFor == VotedEnum.IMAGE2 ? 'bg-fushcia' : 'bg-charcoal'
                                }`}
                                style={{ height: `${votesPercent2}%` }}></div>
                        </div>
                        <VoteImage
                            imgUrl={imageTwo.url as string}
                            voteEnum={VotedEnum.IMAGE2}
                            onVote={onVote}
                        />
                        {voted && (
                            <div
                                className={`absolute right-0 top-0 flex aspect-square h-full items-end justify-center rounded-lg bg-opacity-50 ${
                                    votedFor == VotedEnum.IMAGE2
                                        ? 'border-4 border-fushcia bg-plum'
                                        : 'bg-midnight'
                                }`}>
                                <div className='w-5/6 m-4 flex flex-row justify-evenly space-between items-center rounded-lg bg-midnight' style={{height:'30%'}}>
                                    {votedFor == VotedEnum.IMAGE2 ? (
                                        <FontAwesomeIcon icon={faCheck} className={`text-fushcia h-3/4`}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faCircle} className={`text-slate h-3/4`}/>

                                    )}                                    
                                    <div className='flex flex-col right-0 justify-center mt-2 gap-2 items-center'>
                                        <p className='text-main text-xl text-moonbeam'>
                                            {`${votesImage2} votes`}
                                        </p>
                                        <p className={`text-main text-7xl ${votedFor == VotedEnum.IMAGE2 ? 'text-fushcia' : 'text-charcoal'}`}>
                                            {`${votesPercent2}%`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {imageTwo.caption && (
                        <div className='text-3xl text-blush'>{imageTwo.caption}</div>
                    )}
                </div>
            </div>
        </Slide>
    );
}
