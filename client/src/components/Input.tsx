export default function Input() {
    return (
        <div className='mb-6'>
            <input
                type='text'
                id='large-input'
                className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Poll Names Goes Here'></input>
        </div>
    );
}
