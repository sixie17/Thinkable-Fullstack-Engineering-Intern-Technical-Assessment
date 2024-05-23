"use client"

import React , {useState} from 'react'
import Markdown from 'react-markdown';
import { CodeBlock, Pre } from './CodeBlock';
import { getDefault } from '@/data/BasicPage';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeExternalLinks from 'rehype-external-links';
import EditorHeader from './EditorHead';

const TextEditor = () => {
  const [source, setSource] = useState(getDefault());

  const options = {
    code: CodeBlock,
    pre: Pre
  }
  const feedElement = (syntax: string) => {
    return setSource(source + syntax)
  }
  return (
    <>
    <div className='h-screen flex justify-between'>
    <section className='w-full pt-5 h-full'>
    <EditorHeader feedElement={feedElement}/>
      <textarea
        className='w-full h-full placeholder:opacity-0 bg-transparent'
        placeholder='Write Something Creative'
        value={source}
        onChange={(e) => setSource(e.target.value)}
        autoFocus
      />
    </section>
    <div className='bg-white h-full w-2' />
    <article className='w-full pt-5 pl-6'>
    <Markdown
      className='prose prose-invert min-w-full'
      components={options}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSanitize,
        [rehypeExternalLinks,
          { content: { type: 'text', value: '🔗' } }
        ],
      ]}
      >
      {source}
    </Markdown>
    </article>
  </div>
  </>
  )
}

export default TextEditor