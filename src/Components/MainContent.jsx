
export default function MainContent({ features, activeCard, setActiveCard }) {
    return (
        <main className="flex-1 px-8 py-12 flex flex-col items-center text-center">
            {/* Hero Section */}
            <section className="mb-12 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    Elevate Your Learning Experience
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Manage your courses, track assignments, and stay on top of your academic journey with our comprehensive student portal
                </p>
                <div className="relative w-full max-w-2xl mx-auto h-64 rounded-xl overflow-hidden shadow-lg mb-12">
                    <img
                        src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ea313d3b-1cf8-491c-9c7d-56ce1fe24ed6.png"
                        alt="Students collaborating in a modern university library with laptops and books"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-xl font-medium">Your Academic Success Starts Here</p>
                    </div>
                </div>
            </section>

            {/* Interactive Grid */}
            <section className="w-full max-w-6xl">
                <h2 className="text-3xl font-bold text-primary mb-2">Key Features</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Designed specifically to streamline your academic workflow and boost productivity
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(feature => (
                        <div
                            key={feature.id}
                            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${activeCard === feature.id ? 'ring-2 ring-secondary' : ''}`}
                            onMouseEnter={() => setActiveCard(feature.id)}
                            onMouseLeave={() => setActiveCard(null)}
                            onClick={feature.onClick || (() => { })}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Interactive Progress Circles */}
            <section className="mt-16">
                <h2 className="text-3xl font-bold text-primary mb-12">Your Semester At a Glance</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {[70, 85, 60, 90].map((progress, index) => (
                        <div key={index} className="relative w-32 h-32">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    className="text-gray-200"
                                    strokeWidth="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                />
                                <circle
                                    className="text-secondary"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                    strokeDasharray={`${2 * Math.PI * 40}`}
                                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                                />
                            </svg>
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-primary">{progress}%</span>
                                <span className="text-sm text-gray-600">Course {index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
