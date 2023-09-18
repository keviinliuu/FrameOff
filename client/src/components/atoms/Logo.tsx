import FrameOffLogo from '../../assets/frameoff-logo.svg';

export default function Logo({}) {
    return (
        <div className='p-8 inline-flex position: absolute top-0 left-0'>
            <a className='z-10' href='https://www.frameoff.com'>
                <img className='h-10 aspect-{25/6}' src={FrameOffLogo} />
            </a>
        </div>
    );
}
