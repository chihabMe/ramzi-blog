import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/sanity";

export const metadata: Metadata = {
  title: "Contact | Ramzi Blog",
  description: "Contactez-nous. Nous serions ravis d'avoir de vos nouvelles !",
};

export default async function ContactPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Section d'en-tête */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4 sm:mb-6 tracking-wide px-4">
            Contactez-nous
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-900 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-serif px-4">
            Une question, une suggestion ou juste envie de dire bonjour ? Nous
            serions ravis d&apos;avoir de vos nouvelles. Envoyez-nous un message
            et nous vous répondrons dès que possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 mb-16 sm:mb-18 md:mb-20">
          {/* Informations de contact */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-gray-900 mb-4 sm:mb-6 tracking-wide">
                  Informations de contact
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 mt-1 text-gray-700 flex-shrink-0">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-serif font-medium text-gray-900 mb-1">
                        E-mail
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-serif">
                        contact@ramziblog.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 mt-1 text-gray-700 flex-shrink-0">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-serif font-medium text-gray-900 mb-1">
                        Localisation
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-serif">
                        À distance & International
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 mt-1 text-gray-700 flex-shrink-0">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-serif font-medium text-gray-900 mb-1">
                        Délai de réponse
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-serif">
                        Sous 24 heures
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-gray-900 mb-3 sm:mb-4">
                  Suivez-nous
                </h3>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="https://twitter.com/ramziblog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/ramziblog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/ramziblog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-gray-50 border border-gray-200 p-4 sm:p-6 md:p-8 rounded-sm">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-gray-900 mb-4 sm:mb-6 tracking-wide">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Section FAQ */}
        <div className="border-t border-gray-200 pt-12 sm:pt-14 md:pt-16">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4 sm:mb-6 tracking-wide px-4">
              Questions fréquemment posées
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-900 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="border border-gray-200 p-6 sm:p-8 bg-white hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-gray-900 mb-2 sm:mb-3">
                À quelle vitesse répondez-vous ?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-serif leading-relaxed">
                Nous répondons généralement à toutes les demandes sous 24 heures
                les jours ouvrés.
              </p>
            </div>
            <div className="border border-gray-200 p-6 sm:p-8 bg-white hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-gray-900 mb-2 sm:mb-3">
                Puis-je suggérer des sujets d&apos;articles ?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-serif leading-relaxed">
                Bien s&apos;ûr ! Nous aimons recevoir des suggestions de sujets
                de la part de nos lecteurs. Utilisez le formulaire de contact
                ci-dessus.
              </p>
            </div>
            <div className="border border-gray-200 p-6 sm:p-8 bg-white hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-gray-900 mb-2 sm:mb-3">
                Acceptez-vous des articles invités ?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-serif leading-relaxed">
                Oui, nous acceptons les contributions invitées de qualité. Merci
                d&apos;inclure votre proposition dans votre message.
              </p>
            </div>
            <div className="border border-gray-200 p-6 sm:p-8 bg-white hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-base sm:text-lg md:text-xl font-serif font-medium text-gray-900 mb-2 sm:mb-3">
                Support technique ?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-serif leading-relaxed">
                Pour tout problème technique avec le site, merci de décrire le
                problème en détail lors de votre prise de contact.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer categories={categories} />
    </div>
  );
}
