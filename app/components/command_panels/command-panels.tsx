import Image from 'next/image'

export default function CommandPanel({ title, description}: { title: string, description: string}) {

    return (
        <div className='bg-twm-logo-bg rounded-xl w-1/2 min-w-[500px] h-max mb-5 scale-100 hover:scale-105 transition-transform duration-150'>
            <div className='mx-10 my-10'>
                <h1 className='text-3xl text-twm-sun mt-10'>{title}</h1>
                <p className='text-lg mt-5'>{description}</p>
            </div>
        </div>
    )
}