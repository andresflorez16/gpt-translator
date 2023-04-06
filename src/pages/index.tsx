import ArrowsIcon from './components/icons/ArrowsIcon'
import SpeakerIcon from './components/icons/SpeakerIcon'
import { Inter } from 'next/font/google'
import LangSelector from './components/LangSelector'
import useStore from '@/pages/hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from '@/constants'
import TextArea from './components/TextArea'
import Layout from './components/Layout'
import { useEffect } from 'react'
import useDebounce from './hooks/useDebounce'

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

  const debounceText = useDebounce({ value: text, delay: 300 })

  useEffect(() => {
    if (debounceText === '') return

    fetch('api/translator', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fromLanguage, toLanguage, text }) as any })
      .then(res => res.json())
      .then(data => {
        if (!data || data === null) return
        if (data.code === 422) {
          setResult(data.message)
          return
        }
        setResult(data.result)
      })
  }, [debounceText, fromLanguage, toLanguage])

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Layout>
      <main className={`h-screen w-full mt-5 md:mt-0 grid place-items-center ${inter.variable}`}>
        <section>
          <h2 className='text-4xl font-inter text-center'>GPT Translator</h2>
          <div className='flex flex-col md:flex-row gap-2 mt-8'>
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
          <div className=''>
            <button onClick={handleSpeak}><SpeakerIcon /></button>
          </div>
        </section>
      </main>
    </Layout>
  )
}
