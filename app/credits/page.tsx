'use client'
import Desktop from "../components/desktop";
import Window from "../components/window"

function Title({children} : {children: React.ReactNode}) {
    return(
        <div className="text-3xl text-black mt-4">
            {children}
        </div>
    )
}

function Header({children} : {children: React.ReactNode}) {
    return(
        <div className="text-2xl mt-4 text-twm-sun">
            {children}
        </div>
    )
}

function HeaderTwo({children} : {children: React.ReactNode}) {
    return(
        <div className="text-xl mt-2 text-twm-highlight">
            {children}
        </div>
    )
}

function Text({children} : {children: React.ReactNode}) {
    return(
        <div className="text-lg mx-auto max-w-[500px] text-black">
            {children}
        </div>
    )
}

export default function Page() {
    return(
        <Desktop>
            <Window title='Credits :3' className="max-w-[600px]">
                <Title>Credits</Title>
                
                <Header>Created by</Header>
                <Text>Axiinyaa</Text>

                <Header>Contributors</Header>
                <HeaderTwo>Textbox Implementation</HeaderTwo>
                <Text>RedstoneRuler</Text>
                <HeaderTwo>Github Contributions</HeaderTwo>
                <Text>Hakase</Text>

                <Header>Localization</Header>
                <HeaderTwo>Russian</HeaderTwo>
                <Text> Mr. Saturn</Text>

                <div className="mt-5"/>

                <Text>And of course, the OneShot team for creating such a wonderful game this bot is based off!</Text>
            </Window>
        </Desktop>
    )
}