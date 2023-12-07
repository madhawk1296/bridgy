import { Rubik } from "next/font/google"

const light = Rubik({
    weight: '300',
    subsets: ['latin'],
    display: 'swap',
})

const medium = Rubik({
    weight: '500',
    subsets: ['latin'],
    display: 'swap',
})

const semiBold = Rubik({
    weight: '700',
    subsets: ['latin'],
    display: 'swap',
})

const bold = Rubik({
    weight: '900',
    subsets: ['latin'],
    display: 'swap',
})

export default {
    light: light.className,
    medium: medium.className,
    semiBold: semiBold.className,
    bold: bold.className
}