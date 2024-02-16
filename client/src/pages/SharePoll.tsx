import ShareButton from '../components/elements/ShareButton';
import Heading from '../components/elements/Heading';
import Logo from '../components/elements/Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function SharePoll() {
    const pollTitle = 'My Awesome Poll';
    const pollId = 'dkOwsMq';
    const pollUrl = 'https://frameoff.me/' + pollId;

    const [_, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
    };

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex'>
                <Logo />
            </div>

            <div className='flex flex-col items-center pt-20'>
                <Heading textColor='text-moonbeam' fontSize='text-3xl' textAlign='text-center'>
                    Thanks for using FrameOff! Now go share your poll with the world 🌎
                </Heading>
            </div>

            <div className='flex flex-col items-center pt-20'>
                <div className='w-2/5'>
                    <Heading textColor='text-blush' fontSize='text-3xl'>
                        Share via link
                    </Heading>
                </div>

                <div className='m-1 flex h-12 w-2/5 flex-row rounded border-2 border-blush'>
                    <Heading textColor='text-candy' fontSize='text-2xl' padding='pt-2 pl-4'>
                        {pollUrl}
                    </Heading>

                    <div className='flex grow'>
                        <CopyToClipboard text={pollUrl} onCopy={handleCopy}>
                            <button className='ml-56'>
                                <FontAwesomeIcon
                                    icon={faCopy}
                                    beat
                                    size='lg'
                                    style={{ color: '#FFADE7' }}
                                />
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center space-y-1.5 pt-20'>
                <div className='w-2/5'>
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
