import { Link } from 'react-router-dom';
import Logo from '../components/elements/Logo';
import { useRef } from 'react';
import anime, { AnimeInstance } from 'animejs';

export default function Home() {
    const createPollUnderline = useRef(null);
    const createPollBtn = useRef(null);
    const currentAnim = useRef<AnimeInstance | null>(null);
    const mouseOverCreatePoll = () => {
        currentAnim.current?.pause();
        currentAnim.current = anime({
            targets: createPollUnderline.current,
            duration: 200,
            width: `100%`,
            height: 0,
            easing: 'easeInOutSine',
        });
    };

    const mouseExitCreatePoll = () => {
        currentAnim.current?.pause();
        currentAnim.current = anime({
            targets: createPollUnderline.current,
            duration: 100,
            width: 0,
            height: 0,
            easing: 'easeInOutSine',
        });
    };

    return (
        <div className='flex flex-col items-center gap-y-10 justify-start h-screen w-screen overflow-x-hidden'>
            <Logo />
            <div className='flex flex-row items-center justify-between w-[85%] mt-24'>
                <div className='flex flex-col'>
                    <p className='text-8xl text-blush font-extrabold'>
                        image polls—made<br></br>quick and simple.
                    </p>
                    <p className='text-6xl text-fuchsia font-bold'>
                        slide, vote, repeat. no signup required.
                    </p>
                </div>
                <div className='flex h-[90%]'>
                    <svg
                        className='flex h-full'
                        viewBox='0 0 240 288'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M240 0H0V288H240V0ZM226.286 13.7144H13.7148V226.286H226.286V13.7144Z'
                            fill='#FFADE7'
                        />
                    </svg>
                </div>
            </div>
            <div className='relative flex flex-col items-center select-none text-7xl font-extrabold leading-[0.75] tracking-tighter'>
                <p className='text-nocturne self-start w-[110%]'>
                    a picture is worth a thousand words.a picture is worth a thousand words.a
                    picture is worth a thousand words.a picture is worth a thousand words.a picture
                    is worth a thousand words.a picture is worth a thousand words.
                </p>
                <div
                    className='flex flex-col top-[25%] absolute text-blush bg-midnight'
                    onMouseEnter={mouseOverCreatePoll}
                    onMouseOut={mouseExitCreatePoll}>
                    <Link ref={createPollBtn} to='create'>
                        create poll
                    </Link>
                    <div className='w-0 border-b-4 border-blush' ref={createPollUnderline}></div>
                </div>
            </div>
        </div>
    );
}
