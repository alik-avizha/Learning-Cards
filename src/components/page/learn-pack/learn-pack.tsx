import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import s from './learn-pack.module.scss'

import { Back } from '@/assets'
import { Button, Card, RadioGroupDemo, Typography } from '@/components/ui'
import { useGetDeckQuery, useLearnDeckQuery, useUpdateGradeCardMutation } from '@/services/decks'

export const LearnPack = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [showAnswer, setShowAnswer] = useState(false)

  const { data: deck } = useGetDeckQuery({ id: params.id })
  const { data: randomCard } = useLearnDeckQuery({
    id: params.id,
  })
  const [updateCardGrade] = useUpdateGradeCardMutation()

  const updateCardGradeHandler = (grade: number) => {
    updateCardGrade({ id: deck?.id, cardId: randomCard?.id, grade })
    setShowAnswer(false)
  }

  return (
    <div className={s.learnPackPage}>
      <Button
        onClick={() => {
          navigate(-1)
        }}
        variant={'link'}
        className={s.backButton}
      >
        <Back />
        {t('learn-pack.back')}
      </Button>
      <Card className={s.cardBlock}>
        <Typography variant={'large'} className={s.title}>
          {t('learn-pack.learn')} &quot;{deck?.name}&quot;
        </Typography>
        <Typography variant={'subtitle1'}>
          {t('learn-pack.question')}:{' '}
          <Typography variant={'body1'} className={s.question}>
            {randomCard?.question}
          </Typography>
          {randomCard?.questionImg && (
            <img
              src={randomCard?.questionImg}
              className={s.questionImg}
              alt={t('learn-pack.imgQuestion')}
            />
          )}
        </Typography>
        <Typography variant={'body2'} className={s.info}>
          {t('learn-pack.count')} {randomCard?.shots}
        </Typography>
        {!showAnswer ? (
          <Button variant={'primary'} onClick={() => setShowAnswer(!showAnswer)}>
            {t('learn-pack.showAnswer')}
          </Button>
        ) : (
          <AnswerPage
            answer={randomCard?.answer}
            answerImg={randomCard?.answerImg}
            setNewQuestion={updateCardGradeHandler}
          />
        )}
      </Card>
    </div>
  )
}

type PropsType = {
  answer?: string
  answerImg?: string
  setNewQuestion: (grade: number) => void
}
const AnswerPage: FC<PropsType> = ({ answer, setNewQuestion, answerImg }) => {
  const [value, setValue] = useState(1)
  const { t } = useTranslation()
  const options = [
    { id: 1, value: t('learn-pack.didNotKnow') },
    { id: 2, value: t('learn-pack.forgot') },
    { id: 3, value: t('learn-pack.aLotOfThough') },
    { id: 4, value: t('learn-pack.confused') },
    { id: 5, value: t('learn-pack.knewTheAnswer') },
  ]
  const onClickHandler = () => {
    setNewQuestion(value)
  }

  return (
    <div className={s.answerBlock}>
      <Typography variant={'subtitle1'} className={s.title}>
        {t('learn-pack.answer')}:{' '}
        <Typography variant={'body1'} className={s.answer}>
          {answer}
        </Typography>
        {answerImg && (
          <img src={answerImg} className={s.questionImg} alt={t('learn-pack.imgAnswer')} />
        )}
      </Typography>
      <Typography variant={'subtitle1'} className={s.grade}>
        {t('learn-pack.rateYourself')}
      </Typography>
      <RadioGroupDemo options={options} classname={s.radio} onChangeOption={setValue} />
      <Button onClick={onClickHandler}>{t('learn-pack.nextQuestion')}</Button>
    </div>
  )
}
