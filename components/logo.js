import Image from "next/image";

export default function Logo() {
    return <Image
            src='/images/numogram.png'
            alt='a pic'
            width={250}
            height={487}
            />
}