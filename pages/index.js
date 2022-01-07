import Link from "../components/UI/Link";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useSession} from "next-auth/react";
import {getResourceCollectionFromContext} from "next-drupal";
import * as PropTypes from "prop-types";
import {FrontVideo} from "./FrontVideo";

function Trailers({posts = null}) {

    if (!posts || posts.length == 0) {
        return null
    } else {
        return (
            <>
                {posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: post.body.value}}/>
                    </div>
                ))}
            </>
        )
    }
}

Trailers.propTypes = {posts: PropTypes.array};

export default function Home(props) {
    const {data: session, status} = useSession()
    const loading = status === 'loading'

    const posts = props.posts;
    const {t} = useTranslation();
    return (
        <>
            <h1>{t('Home page')}</h1>
            <ul>
                <li><Link href={"/admin"}>Admin page</Link></li>
                <li><Link href={"/kid"}>{t('Kid page')}</Link></li>
                <li><Link href={"/parent"}>{t('Parent page')}</Link></li>
                <li><Link href={"/signin"}>{t('Login')}</Link></li>
                <li><Link href={"/signup"}>{t('Register')}</Link></li>
                <li><Link href={"/terms"}>{t('Term of use')}</Link></li>
                <li><Link href={"/privacy"}>{t('Privacy policy')}</Link></li>
                <li><Link href={"/contact"}>{t('Contact')}</Link></li>
                <li><Link href={"/dashboard"}>{t('Dashboard')}</Link></li>
            </ul>
            <FrontVideo/>
            <Trailers posts={posts}/>
        </>
    )
}

export async function getStaticProps(context) {
    let posts = null
    //context.params.slug=null;
    //const type = await getResourceTypeFromContext(context)
    // console.log(type)
    try {
        posts = await getResourceCollectionFromContext(
            'node--article',
            context,
            {
                params: {
                    include: 'field_image,uid,uid.user_picture',
                    sort: '-created',
                    "filter[status]": "1",
                },
            }
        )
    } catch (e) {

    }

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            // Will be passed to the page component as props
            posts: posts
        },
    };
}
