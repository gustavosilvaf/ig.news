import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import {getPrismicClient} from "../../services/prismic";
import {RichText} from "prismic-dom";
import styles from './post.module.scss';

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Post({post}: PostProps) {
    console.log(post)
    return (
        <>
            <head>
                <title>{post.title} | Ignews</title>
            </head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}}/>
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params}) => {
    const session = await getSession({req})
    const {slug} = params;

    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('post', String(slug), {})

    const { data: { title, content }, last_publication_date } = response;

    const post = {
        slug,
        title: RichText.asText(title),
        content: RichText.asHtml(content),
        updatedAt: new Date(last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        }
    }

}