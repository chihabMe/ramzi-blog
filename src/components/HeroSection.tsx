interface HeroSectionProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function HeroSection({
  title,
  subtitle,
  children,
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>
        {children}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white opacity-5 rounded-full"></div>
      </div>
    </section>
  );
}
