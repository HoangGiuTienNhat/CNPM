import type { MetaFunction } from 'react-router'
import { AIAdvisorPage } from 'src/features/student'

export const meta: MetaFunction = () => {
    return [{ title: 'AI Advisor' }, { name: 'description', content: 'Get personalized learning path' }]
}

export default AIAdvisorPage
