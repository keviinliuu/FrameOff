import { useState, useEffect, useRef } from 'react';
import { ImageData, VotedEnum } from '../../data/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faExpand } from '@fortawesome/free-solid-svg-icons';

import Slide from './Slide';
import VoteImage from '../images/VoteImage';
import ExpandedImage from '../elements/ExpandedImage';
import axios from 'axios';
import anime from 'animejs';

export interface SlideViewProps {
    title: string | undefined;
    imageOne: ImageData;
    imageTwo: ImageData;
    _id: string | undefined;
    scrollDown: () => void;
    slideIndex: number;
    totalSlideCount: number;
}

export default function SlideView({
    title,
    imageOne,
    imageTwo,
    _id,
    scrollDown,
    slideIndex,
    totalSlideCount,
}: SlideViewProps) {
    const [expand, setExpand] = useState(false);
    const [expandedImage, setExpandedImage] = useState<ImageData | null>(null);

    const [voted, didVote] = useState(false);
    const [votedFor, setVote] = useState('NOT_VOTED');

    const [votesImage1, setVotesImage1] = useState<number | null>(null);
    const [votesPercent1, setVotesPercent1] = useState<number | null>(null);
    const [votesImage2, setVotesImage2] = useState<number | null>(null);
    const [votesPercent2, setVotesPercent2] = useState<number | null>(null);
    const [animPlayed, didAnimPlay] = useState(false);

    const voteStatus = localStorage.getItem(_id!);
    const boxRef1 = useRef(null);
    const barRef1 = useRef(null);
    const percentRef1 = useRef(null);
    const votesRef1 = useRef(null);
    const pathRef1 = useRef(null);
    const borderRef1 = useRef(null);
    const borderBotRefL1 = useRef(null);
    const borderBotRefR1 = useRef(null);

    const boxRef2 = useRef(null);
    const barRef2 = useRef(null);
    const percentRef2 = useRef(null);
    const votesRef2 = useRef(null);
    const pathRef2 = useRef(null);
    const borderRef2 = useRef(null);
    const borderBotRefL2 = useRef(null);
    const borderBotRefR2 = useRef(null);

    const mountedStyle = {
        animation: 'inAnimation 250ms ease-in',
    };
    const unmountedStyle = {
        animation: 'outAnimation 100ms ease-out',
    };

    useEffect(() => {
        if (voteStatus != null && voted == false) {
            didVote(true);
            setVote(voteStatus);
            didAnimPlay(true);
            const requestData = async () => {
                try {
                    const res = await axios.get('/getvotes/' + _id!);
                    const { votesImage1, votesPercent1, votesImage2, votesPercent2 } = res.data;
                    setSlideData(votesImage1, votesPercent1, votesImage2, votesPercent2);
                    voteAnim(voteStatus, VotedEnum.IMAGE1, votesPercent1!);
                    voteAnim(voteStatus, VotedEnum.IMAGE2, votesPercent2!);
                } catch (error) {
                    console.error('Error fetching votes:', error);
                }
            };
            requestData();
        } else if (!animPlayed && voted) {
            voteAnim(votedFor, VotedEnum.IMAGE1, votesPercent1!);
            voteAnim(votedFor, VotedEnum.IMAGE2, votesPercent2!);
            didAnimPlay(true);
        }
    });

    function voteAnim(votedImage: string, animImage: string, votePercent: number) {
        const initialDelay = votedImage == animImage ? 0 : 750;
        const tl = anime.timeline({
            easing: 'easeInOutSine',
            loop: false,
        });
        tl.add(
            {
                targets: animImage == VotedEnum.IMAGE1 ? borderRef1.current : borderRef2.current,
                duration: 150,
                width: [`0%`, `100%`],
                height: 0,
                easing: 'easeInOutSine',
            },
            initialDelay,
        );
        tl.add({
            targets: animImage == VotedEnum.IMAGE1 ? borderRef1.current : borderRef2.current,
            duration: 300,
            height: [`0%`, `100%`],
            easing: 'easeInOutSine',
        });
        tl.add({
            targets:
                animImage == VotedEnum.IMAGE1 ? borderBotRefL1.current : borderBotRefL2.current,
            duration: 20,
            height: [`0%`, `100%`],
            marginLeftWidth: '4px',
            easing: 'easeInOutSine',
        });
        tl.add(
            {
                targets:
                    animImage == VotedEnum.IMAGE1 ? borderBotRefR1.current : borderBotRefR2.current,
                duration: 20,
                height: [`0%`, `100%`],
                marginRightWidth: '4px',
                easing: 'easeInOutSine',
            },
            '-=20',
        );
        tl.add({
            targets:
                animImage == VotedEnum.IMAGE1 ? borderBotRefL1.current : borderBotRefL2.current,
            duration: 300,
            width: [`0%`, `100%`],
            easing: 'easeInOutSine',
        });
        tl.add(
            {
                targets:
                    animImage == VotedEnum.IMAGE1 ? borderBotRefR1.current : borderBotRefR2.current,
                duration: 300,
                width: [`0%`, `100%`],
                easing: 'easeInOutSine',
            },
            '-=300',
        );
        tl.add(
            {
                targets: animImage == VotedEnum.IMAGE1 ? boxRef1.current : boxRef2.current,
                duration: 500,
                translateY: [200, 0],
            },
            initialDelay,
        );
        tl.add(
            {
                targets: animImage == VotedEnum.IMAGE1 ? pathRef1.current : pathRef2.current,
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: 500,
                easing: 'easeInOutSine',
            },
            '-=250',
        );
        tl.add(
            {
                targets: animImage == VotedEnum.IMAGE1 ? barRef1.current : barRef2.current,
                duration: 500,
                height: [0, votePercent],
            },
            '-=250',
        );
        tl.add(
            {
                targets: animImage == VotedEnum.IMAGE1 ? votesRef1.current : votesRef2.current,
                duration: 500,
                opacity: [0, 1],
            },
            '-=500',
        );
        tl.add(
            {
                targets: animImage == VotedEnum.IMAGE1 ? percentRef1.current : percentRef2.current,
                duration: 500,
                round: true,
                innerText: [0, `${votePercent}%`],
                opacity: [0, 1],
                easing: 'easeInOutSine',
            },
            '-=500',
        );
        tl.add(
            {
                targets: animImage == VotedEnum.IMAGE1 ? percentRef1.current : percentRef2.current,
                duration: 500,
                opacity: [0, 1],
                easing: 'easeInOutSine',
            },
            '-=500',
        );
    }

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
        }
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
            <ExpandedImage open={expand} onClose={() => setExpand(false)}>
                <img
                    src={expandedImage?.url as string}
                    className='m-auto max-w-[40vh] md:max-w-[90vh] max-h-[95vh] rounded-lg object-contain'></img>
            </ExpandedImage>

            <div className='mt-12 text-2xl md:text-4xl text-raspberry text-center'>
                {title ? title : <br></br>}
            </div>
            <div className='flex flex-col md:flex-row w-full justify-between items-center md:gap-4'>
                <div className='grid grid-cols-[1fr_max-content_1fr] gap-x-4 justify-items-center items-end'>
                    <div className='hidden md:flex' />
                    <button
                        onClick={() => {
                            setExpand(true);
                            setExpandedImage(imageOne);
                        }}
                        className='sm:hidden flex font-main text-graphite hover:text-slate duration-150 text-sm md:text-lg'>
                        Expand
                    </button>
                    <div className='hidden md:flex' />

                    <div />
                    <div className='flex flex-row gap-x-4 w-[25vh] h-[25vh] md:max-w-[50vh] md:max-h-[50vh] md:w-[30vw] md:h-[30vw] items-end'>
                        <div className='relative flex h-full w-full items-center'>
                            <div className='md:hidden absolute text-moonbeam active:text-slate duration-150 top-0 m-2 rounded h-5 w-5 text-center z-10 bg-midnight/50'>
                                <FontAwesomeIcon
                                    icon={faExpand}
                                    onClick={() => {
                                        setExpand(true);
                                        setExpandedImage(imageOne);
                                    }}
                                    className='translate-y-[0.05rem]'
                                />
                            </div>
                            <VoteImage
                                imgUrl={imageOne.url as string}
                                voteEnum={VotedEnum.IMAGE1}
                                onVote={onVote}
                            />
                            {voted && (
                                <div
                                    className={`absolute flex aspect-square h-full w-full items-end justify-center rounded-lg bg-opacity-50 ${
                                        votedFor == VotedEnum.IMAGE1 ? 'bg-plum' : 'bg-midnight'
                                    }`}>
                                    {votedFor == VotedEnum.IMAGE1 && (
                                        <div
                                            className='absolute self-start rounded-lg border-t-4 border-l-4 border-r-4 border-fuchsia'
                                            ref={borderRef1}
                                        />
                                    )}
                                    {votedFor == VotedEnum.IMAGE1 && (
                                        <div
                                            className='absolute w-0 left-0 rounded-lg border-b-4 border-fuchsia'
                                            ref={borderBotRefL1}
                                        />
                                    )}
                                    {votedFor == VotedEnum.IMAGE1 && (
                                        <div
                                            className='absolute w-0 right-0 rounded-lg border-b-4 border-fuchsia'
                                            ref={borderBotRefR1}
                                        />
                                    )}
                                    <div
                                        className='m-[5%] h-[30%] flex w-full flex-row items-center justify-evenly rounded-lg bg-midnight'
                                        ref={boxRef1}>
                                        <div className='opacity-1 h-3/4'>
                                            {votedFor == VotedEnum.IMAGE1 ? (
                                                <svg
                                                    className='stroke-fuchsia h-full'
                                                    viewBox='0 0 456 512'
                                                    fill='none'>
                                                    <path
                                                        ref={pathRef1}
                                                        d='M35.9492 256.051L163.949 384.051L419.949 128.051'
                                                        strokeWidth='64'
                                                        strokeLinecap='round'
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className='stroke-charcoal h-full'
                                                    viewBox='0 0 512 512'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        ref={pathRef1}
                                                        d='M24 256C24 127.87 127.87 24 256 24C384.13 24 488 127.87 488 256C488 384.13 384.13 488 256 488C127.87 488 24 384.13 24 256Z'
                                                        strokeWidth='49.7143'
                                                        strokeLinecap='round'
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div className='mt-2 flex flex-col items-center justify-center gap-0 md:gap-2'>
                                            <p
                                                className='text-main text-center text-sm md:text-xl text-moonbeam'
                                                ref={votesRef1}>
                                                {`${votesImage1} vote${votesImage1 !== 1 ? 's' : ''}`}
                                            </p>
                                            <p
                                                className={`text-main text-center text-3xl md:text-7xl opacity-0 ${
                                                    votedFor == VotedEnum.IMAGE1
                                                        ? 'text-fuchsia'
                                                        : 'text-charcoal'
                                                }`}
                                                ref={percentRef1}>
                                                {`${votesPercent1}%`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`text-blush w-8 md:w-10 justify-end ${
                            votedFor == VotedEnum.IMAGE1 ? 'bg-fuchsia' : 'bg-charcoal'
                        }`}
                        ref={barRef1}
                        style={{ height: `${votesPercent1}%` }}></div>

                    <div />
                    <div className='flex flex-col items-center'>
                        <div className='text-xl md:text-3xl text-blush pt-1 md:pt-5'>
                            {imageOne.caption ? imageOne.caption : <br></br>}
                        </div>
                    </div>
                </div>

                <div className='flex items-center text-xl md:text-3xl text-blush sm:pb-4'>VS</div>

                <div className='grid grid-cols-[1fr_max-content_1fr] gap-x-4 justify-items-center items-end'>
                    {/* hide first row on mobile because we're doing an icon instead */}
                    <div className='order-1 sm:hidden flex' />{' '}
                    <div className='order-2 sm:hidden flex flex-col items-center'>
                        <button
                            onClick={() => {
                                setExpand(true);
                                setExpandedImage(imageTwo);
                            }}
                            className='font-main text-graphite hover:text-slate duration-150 text-sm md:text-lg pb-1'>
                            Expand
                        </button>
                    </div>
                    <div className='order-3 hidden md:flex' />
                    <div className='order-4 md:order-6' />
                    <div className='order-5 flex flex-row gap-x-4 w-[25vh] h-[25vh] md:max-w-[50vh] md:max-h-[50vh] md:w-[30vw] md:h-[30vw] items-end'>
                        <div className='relative flex h-full w-full items-center'>
                            <div className='md:hidden absolute text-moonbeam active:text-slate duration-150 top-0 m-2 rounded h-5 w-5 text-center z-10 bg-midnight/50'>
                                <FontAwesomeIcon
                                    icon={faExpand}
                                    onClick={() => {
                                        setExpand(true);
                                        setExpandedImage(imageTwo);
                                    }}
                                    className='translate-y-[0.05rem]'
                                />
                            </div>
                            <VoteImage
                                imgUrl={imageTwo.url as string}
                                voteEnum={VotedEnum.IMAGE2}
                                onVote={onVote}
                            />
                            {voted && (
                                <div
                                    className={`absolute flex aspect-square h-full w-full items-end justify-center rounded-lg bg-opacity-50 ${
                                        votedFor == VotedEnum.IMAGE2 ? 'bg-plum' : 'bg-midnight'
                                    }`}>
                                    {votedFor == VotedEnum.IMAGE2 && (
                                        <div
                                            className='absolute self-start rounded-lg border-t-4 border-l-4 border-r-4 border-fuchsia'
                                            ref={borderRef2}
                                        />
                                    )}
                                    {votedFor == VotedEnum.IMAGE2 && (
                                        <div
                                            className='absolute w-1/2 left-0 rounded-lg border-b-4 border-fuchsia'
                                            ref={borderBotRefL2}
                                        />
                                    )}
                                    {votedFor == VotedEnum.IMAGE2 && (
                                        <div
                                            className='absolute w-1/2 right-0 rounded-lg border-b-4 border-fuchsia'
                                            ref={borderBotRefR2}
                                        />
                                    )}
                                    <div
                                        className='m-[5%] h-[30%] flex w-full flex-row items-center justify-evenly rounded-lg bg-midnight'
                                        ref={boxRef2}>
                                        <div className='opacity-1 h-3/4'>
                                            {votedFor == VotedEnum.IMAGE2 ? (
                                                <svg
                                                    className='stroke-fuchsia h-full'
                                                    viewBox='0 0 456 512'
                                                    fill='none'>
                                                    <path
                                                        ref={pathRef2}
                                                        d='M35.9492 256.051L163.949 384.051L419.949 128.051'
                                                        strokeWidth='64'
                                                        strokeLinecap='round'
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className='stroke-charcoal h-full'
                                                    viewBox='0 0 512 512'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        ref={pathRef2}
                                                        d='M24 256C24 127.87 127.87 24 256 24C384.13 24 488 127.87 488 256C488 384.13 384.13 488 256 488C127.87 488 24 384.13 24 256Z'
                                                        strokeWidth='49.7143'
                                                        strokeLinecap='round'
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div className='mt-2 flex flex-col items-center justify-center gap-0 md:gap-2'>
                                            <p
                                                className='text-main text-center text-sm md:text-xl text-moonbeam'
                                                ref={votesRef2}>
                                                {`${votesImage2} vote${votesImage2 !== 1 ? 's' : ''}`}
                                            </p>
                                            <p
                                                className={`text-main text-center text-3xl md:text-7xl opacity-0 ${
                                                    votedFor == VotedEnum.IMAGE2
                                                        ? 'text-fuchsia'
                                                        : 'text-charcoal'
                                                }`}
                                                ref={percentRef2}>
                                                {`${votesPercent2}%`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className={`order-6 text-blush w-8 md:w-10 justify-end md:order-4 ${
                            votedFor == VotedEnum.IMAGE2 ? 'bg-fuchsia' : 'bg-charcoal'
                        }`}
                        ref={barRef2}
                        style={{ height: `${votesPercent2}%` }}></div>
                    <div className='order-7' />
                    <div className='order-8 flex flex-col items-center'>
                        <div className='text-xl md:text-3xl text-blush pt-1 md:pt-5'>
                            {imageTwo.caption ? imageTwo.caption : <br></br>}
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-1 text-blush pt-10 text-3xl md:text-5xl animate-bounce'>
                {voted && slideIndex + 1 !== totalSlideCount && (
                    <button onClick={scrollDown} style={voted ? mountedStyle : unmountedStyle}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                )}
            </div>
        </Slide>
    );
}
