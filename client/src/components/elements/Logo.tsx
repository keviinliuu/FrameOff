import { Link } from 'react-router-dom';
import FrameOffLogo from '../../assets/frameoff-logo.svg';

export default function Logo() {
    return (
        <div className='p-8 absolute top-0 left-0'>
            <Link to='..'>
                <img className='h-10 aspect-{25/6}' src={FrameOffLogo} />
            </Link>
        </div>
    );
}
