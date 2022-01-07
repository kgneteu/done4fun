import {getResourceCollectionFromContext, getResourceFromContext, getResourceTypeFromContext} from "next-drupal";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const TermsPage = ({node}) => {
    console.log(node)
    return (
        <div>

        </div>
    );
};

export async function getStaticProps(context) {
    let node =null;
    const type = await getResourceTypeFromContext(context)
    // context.slug='/doc/terms'
    // node = await getResourceFromContext("node--doc", context)

    //console.log(node)
    console.log(type)
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            // Will be passed to the page component as props
            node:node
        },
    };
}

export default TermsPage;
