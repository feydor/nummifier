import Image from "next/image";

export default function Logo() {
    return <Image
            src='/images/torus-pink.gif'
            alt='a gif of a torus'
            width={408}
            height={204}
            />
}