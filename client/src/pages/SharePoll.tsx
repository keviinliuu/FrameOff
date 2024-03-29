import { useSlideStore } from '../stores/useSlideStore';
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ShareButton from '../components/elements/ShareButton';
import '../index.css';
import Logo from '../components/elements/Logo';

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
        <div className='flex flex-col items-center justify-evenly min-h-screen w-full bg-midnight md:pb-20 overflow-y-hidden'>
            <div>
                <Logo />
            </div>

            <div className='flex flex-col items-center px-4'>
                <div className='text-moonbeam text-2xl md:text-3xl font-main text-center'>
                    Thanks for using FrameOff! Now go share your poll with the world 🌎
                </div>
            </div>

            <div className='flex flex-col w-screen px-5 md:w-[28rem] md:px-0'>
                <div className=''>
                    <div className='text-2xl md:text-3xl text-blush'>Share via link</div>
                </div>

                <div className='flex h-12 flex-row rounded border-2 border-blush'>
                    <div className='text-candy text-xl md:text-2xl pt-2.5 md:pt-2 pl-2 md:pl-4'>
                        {`${pollUrl}poll/${pollId}`}
                    </div>

                    <div className='ml-auto text-blush pt-1 md:pt-0.5 text-xl md:text-2xl'>
                        <SlCopyButton
                            value={`${pollUrl}poll/${pollId}`}
                            copy-label='Click to copy'
                            success-label='Copied!'
                            error-label="Whoops, your browser doesn't support this!"
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col space-y-1.5 w-screen px-5 md:w-[28rem] md:px-0'>
                <div>
                    <div className='text-blush text-2xl md:text-3xl'>Share on social media</div>
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
