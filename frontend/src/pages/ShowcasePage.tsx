import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ShowcaseItem } from '../components/ShowcaseItem';
import type { ShowcaseItemData } from '../components/ShowcaseItem';

// Example data - this could come from an API or a separate config file
const SHOWCASE_ITEMS: ShowcaseItemData[] = [
    {
        id: '1',
        title: 'AnyMaps: A quick demo',
        description: '',
        type: 'youtube',
        src: 'https://youtu.be/6UT8yip7QfY', // Updated link
        duration: '4:47',
        tags: ['1080P', 'AUDIO', 'DEMO'],
        thumbnail: 'https://img.youtube.com/vi/6UT8yip7QfY/maxresdefault.jpg'
    },
    // Add more items here easily
];

export function ShowcasePage() {
    return (
        <div className="min-h-screen bg-espresso text-parchment font-display overflow-x-hidden flex flex-col">
            <Navbar variant="landing" />

            <main className="flex-1 pt-32 pb-20 px-6 relative">
                {/* Background ambient effects */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#2a211c] to-espresso z-0"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-4 border border-gold/20">
                            Founder's Presentation
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 leading-tight">
                            AnyMaps: Demo by it's founder
                        </h1>
                        <p className="text-lg text-parchment/70 max-w-2xl mx-auto font-light leading-relaxed">
                            A guided tour through the philosophy and mechanics of AI-assisted cartography.
                            Witness how thought becomes structure.
                        </p>
                    </div>

                    {/* Showcase Items List */}
                    <div className="flex flex-col gap-12">
                        {SHOWCASE_ITEMS.map(item => (
                            <ShowcaseItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center">
                        <h2 className="text-2xl font-serif text-white mb-6">Ready to chart your own course?</h2>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-3 bg-gold text-espresso px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <span>Try it Yourself</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
