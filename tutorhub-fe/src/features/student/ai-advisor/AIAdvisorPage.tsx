import React, { useState } from 'react'
import { FaRobot, FaLightbulb, FaGraduationCap, FaSpinner, FaUserCog } from 'react-icons/fa'

interface GroupSuggestion {
    id: number
    groupName: string
    description: string
    // Add other fields as needed
}

export const AIAdvisorPage: React.FC = () => {
    const [gpa, setGpa] = useState('')
    const [needs, setNeeds] = useState('')
    const [goals, setGoals] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ learningPath: string; suggestedGroups: GroupSuggestion[] } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Assuming proxy is set up or CORS allows. Using full URL if needed or relative /api
            // Since backend is on another port usually in dev, we might need configuration.
            // But for now assumes /api redirects to backend or they are same origin. 
            // If deployed separately, might need ENV var. 
            // I'll use relative path /api assuming vite proxy or same domain.
            const response = await fetch('http://localhost:8080/api/ai/advisor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ gpa: parseFloat(gpa), needs, goals })
            })

            if (!response.ok) {
                if (response.status === 401) {
                    alert('Session expired. Please login again.')
                    window.location.href = '/login'
                    return
                }
                throw new Error(`Server error: ${response.status}`)
            }

            const data = await response.json()
            setResult(data)
        } catch (error) {
            console.error('Error fetching advice:', error)
            alert('Failed to get advice. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <FaRobot className="text-4xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">AI Learning Advisor</h1>
                        <p className="text-blue-100 mt-1">Get personalized learning paths and group recommendations powered by AI.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <FaGraduationCap className="text-blue-600" />
                            Your Profile
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={gpa}
                                    onChange={(e) => setGpa(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="e.g. 3.5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Needs</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={needs}
                                    onChange={(e) => setNeeds(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="e.g. I struggle with Calculus and want to improve my logical thinking."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={goals}
                                    onChange={(e) => setGoals(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="e.g. Get an A in Math, Prepare for data science internship."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                            >
                                {loading ? <FaSpinner className="animate-spin" /> : <FaLightbulb />}
                                {loading ? 'Generating Path...' : 'Get My Learning Path'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    {!result && !loading && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500 flex flex-col items-center justify-center min-h-[400px]">
                            <FaRobot className="text-6xl text-gray-200 mb-4" />
                            <h3 className="text-xl font-medium text-gray-700">Ready to Assist</h3>
                            <p className="max-w-md mt-2">Fill out your profile on the left to receive a custom AI-generated learning strategy and group recommendations.</p>
                        </div>
                    )}

                    {result && (
                        <>
                            {/* Learning Path */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">AI</span>
                                    Suggested Learning Path
                                </h2>
                                <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {result.learningPath}
                                </div>
                            </div>

                            {/* Recommended Groups */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FaUserCog className="text-orange-500" />
                                    Recommended Groups
                                </h2>

                                {result.suggestedGroups && result.suggestedGroups.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {result.suggestedGroups.map((group) => (
                                            <div key={group.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 transition-colors group cursor-pointer">
                                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{group.groupName}</h3>
                                                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{group.description}</p>
                                                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                                                    <span className="text-blue-600 font-medium">View Details →</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No specific existing groups entered the structured filter, please refer to the text advice above.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
