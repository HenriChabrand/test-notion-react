import React from 'react'
import Head from 'next/head'

import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

const notion = new NotionAPI({authToken:'6b9cfbc0ceddd8f2e8a7a85e6ea2d76924f80ad63d5a81f9470f85e1e298aeb0ae2ba63cc8085decc46dc531867c663462c46d51359e6861d631561bd1153be27d094f3199594f00549530092fc6'})

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId as string
  const recordMap = await notion.getPage(pageId)

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }



  const rootNotionPageId = 'd694391183b84f7abde2f8b6893bd087'
  const rootNotionSpaceId = '36f58d27-8500-4e83-93bc-5d977da4d753'

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections: false
    }
  )

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`)

  return {
    paths,
    fallback: true
  }
}

export default function NotionPage({ recordMap }) {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log(title, recordMap)

  return (
    <>
      <Head>
        <meta name='description' content='React Notion X demo renderer.' />
        <title>{title}</title>
      </Head>

      <NotionRenderer components={{code: Code, collection: Collection, collectionRow: CollectionRow}} recordMap={recordMap} fullPage={true} darkMode={false} />
    </>
  )
}
