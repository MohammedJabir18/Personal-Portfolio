import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import AboutBento from "@/components/sections/about-bento";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <AboutBento />
            <Experience />
            <Projects />
            <Contact />
        </main>
    );
}
