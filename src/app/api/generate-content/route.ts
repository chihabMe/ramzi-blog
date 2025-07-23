import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      prompt,
      type,
      keywords: userKeywords,
    } = await request.json();

    console.log("Received request:", {
      title,
      prompt,
      type,
      keywords: userKeywords,
    }); // Debug log

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ API key not configured");
    }

    const systemPrompt = `Tu es un expert rédacteur SEO spécialisé en technologie et programmation. 
    Tu écris exclusivement en français avec une expertise en optimisation pour les moteurs de recherche.
    
    Tes articles respectent ces critères SEO :
    - Structure hiérarchique claire (H1, H2, H3)
    - Densité de mots-clés optimale (1-2%)
    - Phrases courtes et lisibles
    - Contenu informatif et engageant
    - Meta description attractive
    - Inclusion naturelle des mots-clés
    - Longueur optimale 800-1500 mots`;

    const userPrompt = `Génère un article de blog complet optimisé SEO avec le titre : "${title}"
    
    ${prompt ? `Instructions supplémentaires : ${prompt}` : ""}
    ${userKeywords ? `Mots-clés à inclure naturellement : ${userKeywords}` : ""}
    Type d'article : ${type || "tutoriel"}
    
    Format requis :
    
    META_DESCRIPTION: [Une description de 150-160 caractères optimisée SEO]
    
    SLUG: [Un slug SEO-friendly basé sur le titre]
    
    KEYWORDS: [5-8 mots-clés pertinents séparés par des virgules]
    
    EXCERPT: [Un extrait de 2-3 phrases résumant l'article]
    
    CONTENT:
    # ${title}
    
    [Introduction captivante de 100-150 mots avec le mot-clé principal]
    
    ## [Sous-titre H2 avec mots-clés secondaires]
    
    [Contenu détaillé avec exemples pratiques]
    
    ### [Sous-titre H3 si nécessaire]
    
    [Plus de contenu structuré]
    
    ## [Autre section H2]
    
    [Contenu informatif]
    
    ## Conclusion
    
    [Conclusion engageante qui résume les points clés et incite à l'action]
    
    ---
    
    Assure-toi que l'article :
    - Soit informatif et utile pour les développeurs/techniciens
    - Contienne des exemples concrets quand pertinent
    - Ait une structure logique et fluide
    - Intègre naturellement les mots-clés
    - Soit engageant du début à la fin`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "llama3-70b-8192", // Plus performant pour le SEO
      max_tokens: 3000,
      temperature: 0.7,
      top_p: 0.9,
      stream: false,
    });

    const content = completion.choices[0]?.message?.content || "";

    console.log("Generated content:", content.substring(0, 200) + "..."); // Debug log

    // Parse the structured response
    const sections = content.split("\n\n");
    let metaDescription = "";
    let slug = "";
    let extractedKeywords = "";
    let excerpt = "";
    let articleContent = "";

    sections.forEach((section) => {
      const cleanSection = section.replace(/\*\*/g, "").trim(); // Remove markdown formatting

      if (cleanSection.startsWith("META_DESCRIPTION:")) {
        metaDescription = cleanSection.replace("META_DESCRIPTION:", "").trim();
      } else if (cleanSection.startsWith("SLUG:")) {
        slug = cleanSection.replace("SLUG:", "").trim();
      } else if (cleanSection.startsWith("KEYWORDS:")) {
        extractedKeywords = cleanSection.replace("KEYWORDS:", "").trim();
      } else if (cleanSection.startsWith("EXCERPT:")) {
        excerpt = cleanSection.replace("EXCERPT:", "").trim();
      } else if (cleanSection.startsWith("CONTENT:")) {
        articleContent = content
          .substring(content.indexOf("CONTENT:") + 8)
          .trim();
      }
    });

    return NextResponse.json({
      content: articleContent,
      metaDescription,
      slug,
      keywords: extractedKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0),
      excerpt,
    });
  } catch (error) {
    console.error("Error generating content with Groq:", error);
    return NextResponse.json(
      { error: "Échec de la génération du contenu" },
      { status: 500 }
    );
  }
}
