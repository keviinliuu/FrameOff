import { useSlideStore } from '../stores/useSlideStore';
import { SlCopyButton } from '@shoelace-style/shoelace/dist/react';

import ShareButton from '../components/elements/ShareButton';
import Heading from '../components/elements/Heading';
import Logo from '../components/elements/Logo';
import '../index.css';

export default function SharePoll() {
    const pollId = useSlideStore(state => state.pollId);
    const pollTitle = useSlideStore(state => state.pollTitle);
    const pollUrl = `https://frameoff.me/${pollId}`;

    return (
        <div className='flex flex-col justify-center items-center min-h-screen w-screen'>
            <div className='flex'>
                <Logo />
            </div>

            <div className='flex flex-col items-center pb-24 px-4 pt-4'>
                <Heading textColor='text-moonbeam' fontSize='text-3xl' textAlign='text-center'>
                    Thanks for using FrameOff! Now go share your poll with the world 🌎
                </Heading>
            </div>

            <div className='flex flex-col pb-10 w-[28rem]'>
                <div className=''>
                    <Heading textColor='text-blush' fontSize='text-3xl'>
                        Share via link
                    </Heading>
                </div>

                <div className='flex h-12 flex-row rounded border-2 border-blush'>
                    <Heading textColor='text-candy' fontSize='text-2xl' padding='pt-2 pl-4'>
                        {pollUrl}
                    </Heading>

                    <div className='ml-auto  text-blush pt-0.5 text-2xl'>
                        <SlCopyButton
                            value={pollUrl}
                            copy-label='Click to copy'
                            success-label='Copied!'
                            error-label="Whoops, your browser doesn't support this!"
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col space-y-1.5 pt-20 w-[28rem]'>
                <div>
                    <Heading textColor='text-blush' fontSize='text-3xl'>
                        Share on social media
                    </Heading>
                </div>

                <ShareButton
                    icon='facebook-f'
                    bgColor='bg-[#4267B2]'
                    onClick={() => {
                        window.open(
                            'https://www.facebook.com/sharer/sharer.php?u=' + pollUrl,
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
                            'https://www.twitter.com/share?text=' + pollTitle + '&url=' + pollUrl,
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
                            'https://reddit.com/submit?url=' +
                                pollUrl +
                                '&title=' +
                                pollTitle +
                                ' - FrameOff',
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
                            'https://api.whatsapp.com/send?text=' + pollTitle + ' - ' + pollUrl,
                            '_blank',
                        );
                    }}>
                    WhatsApp
                </ShareButton>
            </div>
        </div>
    );
}
