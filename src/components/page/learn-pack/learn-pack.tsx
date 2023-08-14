import { FC, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './learn-pack.module.scss'

import { Back } from '@/assets'
import { Button, Card, RadioGroupDemo, Typography } from '@/components/ui'
import { useGetDeckQuery, useLearnDeckQuery, useUpdateGradeCardMutation } from '@/services/decks'

export const LearnPack = () => {
  const params = useParams<{ id: string }>()

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
      <Button as={Link} to="/" variant={'link'} className={s.backButton}>
        <Back />
        Back to Packs List
      </Button>
      {deck?.cardsCount ? (
        <Card className={s.cardBlock}>
          <Typography variant={'large'} className={s.title}>
            Learn &quot;{deck?.name}&quot;
          </Typography>
          <Typography variant={'subtitle1'}>
            Question:{' '}
            <Typography variant={'body1'} className={s.question}>
              {randomCard?.question}
            </Typography>
          </Typography>
          <Typography variant={'body2'} className={s.info}>
            Количество попыток ответов на вопрос: {randomCard?.shots}
          </Typography>
          {!showAnswer ? (
            <Button variant={'primary'} onClick={() => setShowAnswer(!showAnswer)}>
              Show Answer
            </Button>
          ) : (
            <AnswerPage answer={randomCard?.answer} setNewQuestion={updateCardGradeHandler} />
          )}
        </Card>
      ) : (
        <Typography variant={'large'} className={s.error}>
          На данный момент владелец колоды не создал карточки
        </Typography>
      )}
    </div>
  )
}

type PropsType = {
  answer?: string
  setNewQuestion: (grade: number) => void
}
const AnswerPage: FC<PropsType> = ({ answer, setNewQuestion }) => {
  const [value, setValue] = useState(1)
  const options = [
    { id: 1, value: 'Did not know' },
    { id: 2, value: 'Forgot' },
    { id: 3, value: 'A lot of though' },
    { id: 4, value: 'Confused' },
    { id: 5, value: 'Knew the answer' },
  ]
  const onClickHandler = () => {
    setNewQuestion(value)
  }

  return (
    <div className={s.answerBlock}>
      <Typography variant={'subtitle1'} className={s.title}>
        Answer:{' '}
        <Typography variant={'body1'} className={s.answer}>
          {answer}
        </Typography>
      </Typography>
      <Typography variant={'subtitle1'} className={s.grade}>
        Rate yourself:
      </Typography>
      <RadioGroupDemo options={options} classname={s.radio} onChangeOption={setValue} />
      <Button onClick={onClickHandler}>Next Question</Button>
    </div>
  )
}
