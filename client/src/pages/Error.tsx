import '../index.css';

export default function Error() {
    return (
        <div className='flex flex-col justify-center items-center gap-y-7 min-h-screen w-screen overflow-y-hidden'>
            <img
                src='https://stickerly.pstatic.net/sticker_pack/R1vDFbKpUzAqkrTcZGmoag/KZ58GI/2/29eea077-e1f4-4251-98af-e9fc6990ee21.png'
                alt='sad cat'
            />
            <div className='text-4xl md:text-8xl px-5 text-white text-center'>
                404 Page Not Found
            </div>
            <div className='text-2xl md:text-3xl px-5 text-blush text-center'>
                Whoops! We couldn't find what you were looking for.
            </div>
        </div>
    );
}
