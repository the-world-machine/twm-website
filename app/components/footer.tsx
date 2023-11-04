import Image from 'next/image'

export default function Footer() {
    return (
        <div className="flex justify-center p-5 bg-black w-full h-30 font-main">
            <Image src="/icon.png" alt="logo" width={50} height={10} fill={false} className='w-15 h-12 mt-5'/>
            <div className='mt-3 ml-5 text-center'>
                <a href='/terms-and-conditions' className="mx-5 hover:text-twm-sun text-center">Terms and Conditions<br/></a>
                <a href='/privacy-policy' className="mx-5 hover:text-twm-sun text-center">Privacy Policy<br/></a>
                <a href='https://discord.gg/gtfeHfka5h' className="mx-5 hover:text-twm-sun text-center">Support Server<br/></a>
            </div>
         </div>
    )
}