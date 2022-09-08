import StartGame from '@components/StartGame'
import type { NextPage } from 'next'
import prisma from '@util/prisma'
import { useEffect, useMemo, useState } from 'react';
import GameContainer from '@components/GameContainer';
import authorizeRequest from '@middlewares/authorizeRequest';

interface PlayProps {
    questions: {
        id: number;
        content: string;
        choices?: string;
        correctAnswer?: string;
    }[]
    teams: {
        id: number;
        name: string;
    }[]
}

const Play: NextPage<PlayProps> = ({ questions, teams }) => {
    const [playing, setPlaying] = useState(false)
    const [answerTimeout, setAnswerTimeout] = useState(15)
    // shuffle questions array
    const shuffledQuestions = useMemo(() => {
        const shuffled = questions.sort(() => Math.random() - 0.5)
        return shuffled
    }, [questions])

    return <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl h-full mx-auto">
            {!playing && <StartGame timeoutValue={answerTimeout} onChange={setAnswerTimeout} onClick={() => {
                setPlaying(true)
            }} questions={shuffledQuestions} teams={teams} />}

            {playing && <GameContainer timeoutValue={answerTimeout} questions={shuffledQuestions} teams={teams} />}
        </div>
    </div>
}

export const getServerSideProps = authorizeRequest(async () => {
    return {
        props: {
            questions: await prisma.questions.findMany({
                orderBy: {
                    id: 'asc'
                },
                select: {
                    id: true,
                    content: true,
                    choices: true,
                    correctAnswer: true
                }
            }),
            teams: await prisma.teams.findMany({
                select: {
                    id: true,
                    name: true
                }
            })
        }
    }
})

export default Play