import { 
    Hero, 
    OurProcess, 
    ClientsList, 
    OurProjects, 
    OurRules,
    Testimonial,
} from "../components";

export function HomePage() {
    return (
        <main className="flex flex-col w-full min-h-screen bg-[var(--color-primary-25)] font-sans">
            <Hero />
            <OurProcess />
            <ClientsList />
            <OurProjects />
            <OurRules />
            <Testimonial />
        </main>
    );
}

export default HomePage;
