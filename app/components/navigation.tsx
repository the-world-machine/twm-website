import DesktopIcon from './desktop-icon'

export default function Navigation() {
    return (
        <div className='absolute font-main pt-10 grid gap-14 scale-90 grid-cols-4 mx-2 bottom-5 md:grid-cols-1 md:grid-rows-4 md:top-1 md:grid-flow-col md:left-5 md:gap-1'>
            <DesktopIcon filename="invite" icon_name="Invite Bot" redirect='/invite'/>
            <DesktopIcon filename="person" icon_name="Edit Profile" redirect='/profile'/>
            <DesktopIcon filename="sun" icon_name="Buy OneShot" redirect='https://store.steampowered.com/app/420530/OneShot/'/>
        </div>
    )
}