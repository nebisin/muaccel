import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'

const HomePage = () => {
    const router = useRouter()
    const id = router.query.id;
    useEffect(() => {
        Router.push("/mevzuat/act/[id]/[page]", `/mevzuat/act/${id}/0`)
    })
    return null;
}

export default HomePage;