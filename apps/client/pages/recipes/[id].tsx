
import { useRouter } from 'next/router'


export default function Index() {
    const router = useRouter()
    return <p>Post: {router.asPath}</p>
}