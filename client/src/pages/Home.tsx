import { Link } from 'react-router-dom';
import Logo from '../components/elements/Logo';
import { useRef } from 'react';
import anime, { AnimeInstance } from 'animejs';
import RandomizedFrame from '../components/home/RandomizedFrame';

export default function Home() {
    const createPollUnderline = useRef(null);
    const createPollUnderlineMobile = useRef(null);
    const createPollBtn = useRef(null);
    const currentAnim = useRef<AnimeInstance | null>(null);
    const mouseOverCreatePoll = () => {
        currentAnim.current?.pause();
        currentAnim.current = anime({
            targets: [createPollUnderline.current, createPollUnderlineMobile.current],
            duration: 200,
            width: `100%`,
            height: 0,
            easing: 'easeInOutSine',
        });
    };

    const mouseExitCreatePoll = () => {
        currentAnim.current?.pause();
        currentAnim.current = anime({
            targets: [createPollUnderline.current, createPollUnderlineMobile.current],
            duration: 100,
            width: 0,
            height: 0,
            easing: 'easeInOutSine',
        });
    };

    return (
        <div>
            <Logo />
            <div className='hidden md:flex flex-col items-center gap-y-10 justify-between h-screen w-screen overflow-x-hidden'>
                <div className='flex flex-row items-center justify-between w-[85%] mt-32 leading-none'>
                    <div className='flex flex-col'>
                        <p className='text-[7.5vw] text-blush font-extrabold'>
                            image polls—made<br></br>quick and simple.
                        </p>
                        <p className='text-[3.75vw] text-fuchsia font-bold'>
                            slide, vote, repeat. no signup required.
                        </p>
                    </div>
                    <div className='flex flex-col h-[90%]'>
                        <RandomizedFrame />
                    </div>
                </div>
                <div className='relative flex flex-col items-center select-none text-7xl font-extrabold leading-[0.75] tracking-[-0.05em] text-nocturne'>
                    <div className='marquee'>
                        <div className='track1'>
                            a picture is worth a thousand words. a picture is worth a thousand
                            words. a picture is worth a thousand words. a picture is worth a
                            thousand words. a picture is worth a thousand words.{' '}
                        </div>
                        <div className='track2'>
                            a thousand words. a picture is worth a thousand words. a picture is
                            worth a thousand words. a picture is worth a thousand words. a picture
                            is worth a thousand words. a picture is worth{' '}
                        </div>
                        <div className='track1'>
                            words. a picture is worth a thousand words. a picture is worth a
                            thousand words. a picture is worth a thousand words. a picture is worth
                            a thousand words. a picture is worth a thousand{' '}
                        </div>
                        <div className='track2'>
                            is worth a thousand words. a picture is worth a thousand words. a
                            picture is worth a thousand words. a picture is worth a thousand words.
                            a picture is worth a thousand words. a picture{' '}
                        </div>
                    </div>
                    <div
                        className='flex flex-col top-[25%] absolute text-blush bg-midnight'
                        onMouseEnter={mouseOverCreatePoll}
                        onMouseOut={mouseExitCreatePoll}>
                        <Link ref={createPollBtn} to='create'>
                            create poll
                        </Link>
                        <div
                            className='w-0 -mt-1 border-b-4 border-blush'
                            ref={createPollUnderline}></div>
                    </div>
                </div>
                <div />
            </div>
            <div className='md:hidden flex flex-col items-center p-3 justify-between pt-20 h-screen w-screen overflow-x-hidden'>
                <div className='flex flex-col gap-y-4 w-full leading-none'>
                    <div className='flex flex-row items-center justify-between'>
                        <p className='text-[24vw] leading-[0.9] text-blush font-extrabold'>
                            image polls,
                        </p>
                        <RandomizedFrame />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-[17vw] text-blush font-extrabold'>
                            made quick and simple.
                        </p>
                        <p className='self-center text-[5.5vw] text-fuchsia font-bold'>
                            slide, vote, repeat. no signup required.
                        </p>
                    </div>
                </div>
                <div className='relative flex flex-col items-center select-none text-[8vh] font-extrabold leading-[0.75] tracking-[-0.05em] text-nocturne'>
                    <div className='marquee'>
                        <div className='track1'>
                            a picture is worth a thousand words. a picture is worth a thousand
                            words. a picture is worth a thousand words. a picture is worth a
                            thousand words. a picture is worth a thousand words.{' '}
                        </div>
                        <div className='track2'>
                            a thousand words. a picture is worth a thousand words. a picture is
                            worth a thousand words. a picture is worth a thousand words. a picture
                            is worth a thousand words. a picture is worth{' '}
                        </div>
                        <div className='track1'>
                            words. a picture is worth a thousand words. a picture is worth a
                            thousand words. a picture is worth a thousand words. a picture is worth
                            a thousand words. a picture is worth a thousand{' '}
                        </div>
                        <div className='track2'>
                            is worth a thousand words. a picture is worth a thousand words. a
                            picture is worth a thousand words. a picture is worth a thousand words.
                            a picture is worth a thousand words. a picture{' '}
                        </div>
                        <div className='track1'>
                            worth a thousand words. a picture is worth a thousand words. a picture
                            is worth a thousand words. a picture is worth a thousand words. a
                            picture is worth a thousand words.{' '}
                        </div>
                        <div className='track2'>
                            words. a picture is worth a thousand words. a picture is worth a
                            thousand words. a picture is worth a thousand words. a picture is worth
                            a thousand words. a picture is worth{' '}
                        </div>
                    </div>
                    <div
                        className='flex flex-col top-1/3 absolute text-blush bg-midnight'
                        onMouseEnter={mouseOverCreatePoll}
                        onMouseOut={mouseExitCreatePoll}>
                        <Link ref={createPollBtn} to='create'>
                            create poll
                        </Link>
                        <div
                            className='w-0 border-b-4 border-blush'
                            ref={createPollUnderlineMobile}></div>
                    </div>
                </div>
                <div />
            </div>
        </div>
    );
}
