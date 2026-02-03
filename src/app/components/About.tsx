import { GraduationCap } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { ImageWithFallback } from "@/app/components/image/ImageWithFallback";

export function About() {
  return (
    <section className="py-28 md:py-32 px-4 bg-transparent" id="about">
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch md:h-[36rem]">
          {/* Left: avatar (hidden on small screens) */}
          <div className="hidden md:block">
            <Card className="p-0 bg-transparent border-slate-700 overflow-hidden h-full">
              <div className="w-full h-full bg-slate-900">
                <ImageWithFallback
                  src="/image/dries.jpeg"
                  alt="Dries Bielen"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Right: about + education */}
          <Card className="p-8 bg-transparent border-slate-700 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
              About me
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              I'm a passionate fullstack developer based in Belgium with a love
              for creating seamless digital experiences. I thrive on turning
              complex problems into elegant, user-friendly solutions.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              With a strong foundation in both frontend and backend
              technologies, I enjoy working across the entire stack to build
              robust applications. When I'm not coding, you can find me sipping
              coffee, playing video games or maybe even{" "}
              <a
              href="https://twitch.tv/driesjuhhhh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300"
              >
              streaming
              </a>
              .
            </p>

            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <GraduationCap className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-cyan-400">
                  Education
                </h3>
                <p className="text-slate-300">
                  <span className="font-bold">Application Development</span>
                  <br />
                  <span className="font-semibold"> PXL University college</span>
                  <br />
                  Hasselt, Belgium
                </p>
              </div>
            </div>

          </Card>
        </div>
      </div>
    </section>
  );
}
