import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { PromptInput } from '@/components/PromptInput';
import { CategoryChips } from '@/components/CategoryChips';
import { ArchivesGallery } from '@/components/ArchivesGallery';

export function LandingPage() {
    return (
        <div className="font-display text-slate-800 bg-background-light overflow-x-hidden">
            <Navbar variant="landing" />

            <main className="pt-20">
                {/* Hero Section */}
                <HeroSection />

                {/* Atelier Input Section */}
                <section className="bg-background-light py-24 px-6 paper-grain">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-3xl font-serif text-espresso mb-4">Step into the Atelier</h3>
                        <p className="text-slate-600 mb-12">
                            Describe your concept in plain language, and our AI cartographer will begin drafting your masterpiece in real-time.
                        </p>

                        <PromptInput variant="landing" />

                        <CategoryChips />
                    </div>
                </section>

                {/* Archives Gallery */}
                <ArchivesGallery />
            </main>

            <Footer />
        </div>
    );
}
