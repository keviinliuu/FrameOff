import '../index.css';

export default function Error() {
    return (
        <div className='flex flex-col justify-center items-center gap-y-7 min-h-screen w-screen'>
            <img
                src='https://stickerly.pstatic.net/sticker_pack/R1vDFbKpUzAqkrTcZGmoag/KZ58GI/2/29eea077-e1f4-4251-98af-e9fc6990ee21.png'
                alt='sad cat'
            />
            <div className='text-8xl text-white'>404 Page Not Found</div>
            <div className='text-3xl text-blush'>
                Whoops! We couldn't find what you were looking for.{' '}
            </div>
        </div>
    );
}
