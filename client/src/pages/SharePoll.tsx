import { useSlideStore } from '../stores/useSlideStore';
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ShareButton from '../components/elements/ShareButton';
import FrameOffLogo from '../assets/frameoff-logo.svg';
import '../index.css';

export default function SharePoll() {
    const storePollId = useSlideStore(state => state.pollId);
    const [pollId, setPollId] = useState(storePollId);
    const storePollTitle = useSlideStore(state => state.pollTitle);
    const [pollTitle, setPollTitle] = useState(storePollTitle);
    const pollUrl = 'https://frameoff.me/';
    const navigate = useNavigate();

    useEffect(() => {
        const localPollId = localStorage.getItem('pollId');
        const localPollTitle = localStorage.getItem('pollTitle');
        if (!storePollId) {
            if (!localPollId) {
                navigate('/');
                return;
            } else {
                setPollId(localPollId);
                setPollTitle(localPollTitle);
            }
        } else {
            setPollId(storePollId);
            setPollTitle(storePollTitle);
            localStorage.setItem('pollId', storePollId);
            localStorage.setItem('pollTitle', storePollTitle!);
        }
    }, [storePollId, storePollTitle, navigate]);

    return (
        <div className='flex flex-col justify-center items-center min-h-screen w-full bg-midnight'>
            <div>
                <div className='p-8 absolute top-0 left-0'>
                    <a href='https://www.frameoff.com'>
                        <img className='h-7 md:h-10 aspect-{25/6}' src={FrameOffLogo} />
                    </a>
                </div>
            </div>

            <div className='flex flex-col items-center pb-20 pt-2 md:pb-24 md:pt-4 px-4'>
                <div className='text-moonbeam text-2xl pt-20 md:text-3xl md:pt-0 font-main text-center'>
                    Thanks for using FrameOff! Now go share your poll with the world 🌎
                </div>
            </div>

            <div className='flex flex-col pb-5 md:pb-10 w-screen px-5 md:w-[28rem] md:px-0'>
                <div className=''>
                    <div className='text-2xl md:text-3xl text-blush'>Share via link</div>
                </div>

                <div className='flex h-12 flex-row rounded border-2 border-blush'>
                    <div className='text-candy text-xl md:text-2xl pt-2 pl-4'>
                        {`${pollUrl}poll/${pollId}`}
                    </div>

                    <div className='ml-auto text-blush pt-0.5 text-2xl'>
                        <SlCopyButton
                            value={`${pollUrl}poll/${pollId}`}
                            copy-label='Click to copy'
                            success-label='Copied!'
                            error-label="Whoops, your browser doesn't support this!"
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col space-y-1.5 pt-20 w-screen px-5 md:w-[28rem] md:px-0 pb-5'>
                <div>
                    <div className='text-blush text-2xl md:text-3xl'>
                        Share on social media
                    </div>
                </div>

                <ShareButton
                    icon='facebook-f'
                    bgColor='bg-[#4267B2]'
                    onClick={() => {
                        window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${pollUrl}${pollId}`,
                            '_blank',
                        );
                    }}>
                    Facebook
                </ShareButton>
                <ShareButton
                    icon='x-twitter'
                    bgColor='bg-[#1DA1F2]'
                    onClick={() => {
                        window.open(
                            `https://www.twitter.com/share?text=${pollTitle} -&url=${pollUrl}${pollId}`,
                            '_blank',
                        );
                    }}>
                    X
                </ShareButton>
                <ShareButton
                    icon='reddit-alien'
                    bgColor='bg-[#FF4500]'
                    onClick={() => {
                        window.open(
                            `https://reddit.com/submit?url=${pollUrl}${pollId}&title=${pollTitle} - FrameOff`,
                            '_blank',
                        );
                    }}>
                    Reddit
                </ShareButton>
                <ShareButton
                    icon='whatsapp'
                    bgColor='bg-[#25D366]'
                    onClick={() => {
                        window.open(
                            `https://api.whatsapp.com/send?text=${pollTitle} - ${pollUrl}${pollId}`,
                            '_blank',
                        );
                    }}>
                    WhatsApp
                </ShareButton>
            </div>
        </div>
    );
}
