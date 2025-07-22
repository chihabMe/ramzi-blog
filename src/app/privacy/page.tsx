import Link from "next/link";
import Header from "@/components/Header";

// Generate metadata for the page
export async function generateMetadata() {
  return {
    title: "Politique de Confidentialité - Blog",
    description:
      "Notre politique de confidentialité et utilisation des données",
  };
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-gray-600">
            Dernière mise à jour: 22 Juillet 2025
          </p>
        </div>

        {/* Privacy Content */}
        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Bienvenue sur notre politique de confidentialité. Nous respectons
            votre vie privée et nous nous engageons à protéger vos données
            personnelles. Cette politique de confidentialité vous informera sur
            la façon dont nous traitons vos données personnelles lorsque vous
            visitez notre site web et vous informera sur vos droits en matière
            de confidentialité et sur la façon dont la loi vous protège.
          </p>

          <h2>Les Données que Nous Collectons</h2>
          <p>
            Nous pouvons collecter, utiliser, stocker et transférer différents
            types de données personnelles vous concernant que nous avons
            regroupées comme suit :
          </p>
          <ul>
            <li>
              <strong>Données d'identité</strong> : inclut le prénom, le nom de
              famille, le nom d'utilisateur ou identifiant similaire.
            </li>
            <li>
              <strong>Données de contact</strong> : inclut l'adresse e-mail et
              les numéros de téléphone.
            </li>
            <li>
              <strong>Données techniques</strong> : inclut l'adresse IP, les
              données de connexion, le type et la version du navigateur, le
              fuseau horaire et l'emplacement, les types et versions de plug-ins
              de navigateur, le système d'exploitation et la plateforme, et
              d'autres technologies sur les appareils que vous utilisez pour
              accéder à ce site web.
            </li>
            <li>
              <strong>Données d'utilisation</strong> : inclut des informations
              sur la façon dont vous utilisez notre site web.
            </li>
          </ul>

          <h2>Comment Nous Utilisons Vos Données</h2>
          <p>
            Nous utiliserons vos données personnelles uniquement lorsque la loi
            nous y autorise. Le plus souvent, nous utiliserons vos données
            personnelles dans les circonstances suivantes :
          </p>
          <ul>
            <li>Pour enregistrer votre abonnement à notre newsletter.</li>
            <li>
              Pour répondre à vos demandes via notre formulaire de contact.
            </li>
            <li>Pour améliorer notre site web et assurer sa sécurité.</li>
            <li>Pour mesurer l'efficacité de notre contenu.</li>
          </ul>

          <h2>Conservation des Données</h2>
          <p>
            Nous conserverons vos données personnelles aussi longtemps que
            nécessaire pour atteindre les objectifs pour lesquels nous les avons
            collectées, y compris pour satisfaire à toute exigence légale,
            comptable ou de reporting.
          </p>

          <h2>Vos Droits Légaux</h2>
          <p>
            Dans certaines circonstances, vous avez des droits en vertu des lois
            sur la protection des données concernant vos données personnelles,
            notamment le droit d'accès, de rectification, d'effacement,
            d'opposition au traitement, de portabilité des données et de retrait
            du consentement.
          </p>

          <h2>Cookies</h2>
          <p>
            Notre site peut utiliser des cookies pour distinguer les
            utilisateurs de notre site web. Cela nous aide à vous offrir une
            bonne expérience lorsque vous naviguez sur notre site web et nous
            permet également d'améliorer notre site.
          </p>

          <h2>Modifications de la Politique de Confidentialité</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de
            temps en temps en publiant une nouvelle version sur notre site web.
            Vous devriez vérifier cette page occasionnellement pour vous assurer
            que vous êtes satisfait des changements.
          </p>

          <h2>Nous Contacter</h2>
          <p>
            Si vous avez des questions concernant cette politique de
            confidentialité, veuillez nous contacter via notre{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800">
              formulaire de contact
            </Link>
            .
          </p>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-serif transition-colors duration-200"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
