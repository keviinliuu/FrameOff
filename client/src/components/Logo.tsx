import FrameOffLogo from '../assets/frameoff-logo.svg';

export default function Logo({}) {
    return (
        <a href='https://www.frameoff.com'>
            <img
                src={FrameOffLogo}
                className='h-auto w-logocustom pl-14 pt-12'
                alt='FrameOff Logo'
            />
        </a>
    );
}
