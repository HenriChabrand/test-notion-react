import React from 'react'
import Head from 'next/head'

import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { NotionRenderer, Code, Collection, CollectionRow } from 'react-notion-x'

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

const notion = new NotionAPI({authToken:process.env.NOTION_TOKEN})

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId as string
  const recordMap = await notion.getPage(pageId)
  
  const pageUrlOverid = {
    'notion-powered-blog':'fcf661e4196a40dc81646903b90b9027'
  }
  
  if(pageUrlOverid[pageId]){
    pageId = pageUrlOverid[pageId];
  }

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
  console.log("paths",paths);
  
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
        <title>Test {title} </title>
      </Head>

      <NotionRenderer components={{code: Code, collection: Collection, collectionRow: CollectionRow}} recordMap={recordMap} fullPage={true} darkMode={true} />
    </>
  )
}
