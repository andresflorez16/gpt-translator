import { ArrowsIcon } from './components/Icons'
import { Inter } from 'next/font/google'
import { LangSelector } from './components/LangSelector'
import useStore from '@/pages/hooks/useStore'
import { AUTO_LANGUAGE } from '@/constants'
import { TextArea } from './components/TextArea'
import Layout from './components/Layout'

const inter = Inter({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export default function Home () {
  const {
    text,
    result,
    setResult,
    setText,
    loading,
    fromLanguage,
    toLanguage,
    interchangeLang,
    setFromLanguage,
    setToLanguage
  } = useStore()
  return (
    <Layout>
      <main className={`min-h-screen max-w-2xl grid place-items-center m-auto ${inter.variable}`}>
        <section>
          <h2 className='text-4xl font-inter text-center'>GPT Translator</h2>
          <div className='flex gap-2 my-8'>
            <div className='flex flex-col gap-2'>
              <LangSelector
                type='from'
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea
                onChange={setText}
                type='from'
                value={text}
              />
            </div>
            <div className='flex flex-col mx-3 mt-2'>
              <button className={fromLanguage === AUTO_LANGUAGE ? 'opacity-20' : ''} onClick={interchangeLang} disabled={fromLanguage === AUTO_LANGUAGE}><ArrowsIcon /></button>
            </div>
            <div className='flex flex-col gap-2'>
              <LangSelector
                type='to'
                value={toLanguage}
                onChange={setToLanguage}
              />
              <TextArea
                onChange={setResult}
                type='to'
                value={result}
                loading={loading}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
