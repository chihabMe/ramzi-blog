"use client";
import React, { useState } from "react";
import {
  Stack,
  Button,
  TextInput,
  Card,
  Text,
  Select,
  TextArea,
  Flex,
  Badge,
  Box,
} from "@sanity/ui";
import { useFormValue, PatchEvent, set } from "sanity";

export function AiContentGenerator(props: any) {
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [articleType, setArticleType] = useState("tutoriel");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const title = useFormValue(["title"]) as string;

  const articleTypes = [
    { value: "tutoriel", title: "Tutoriel technique" },
    { value: "guide", title: "Guide pratique" },
    { value: "analyse", title: "Analyse technique" },
    { value: "actualite", title: "Actualité tech" },
    { value: "comparaison", title: "Comparaison d'outils" },
    { value: "opinion", title: "Article d'opinion" },
    { value: "interview", title: "Interview" },
    { value: "retour-experience", title: "Retour d'expérience" },
  ];

  const generateContent = async () => {
    if (!title) {
      setError("Veuillez d'abord saisir un titre");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const enhancedPrompt = `Type d'article: ${
        articleTypes.find((t) => t.value === articleType)?.title
      }
      ${prompt ? `Instructions: ${prompt}` : ""}`;

      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          prompt: enhancedPrompt,
          type: articleType,
          keywords: keywords,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la génération");
      }

      const {
        content,
        metaDescription,
        slug,
        keywords: generatedKeywords,
        excerpt,
      } = await response.json();

      // Convert content to Sanity blocks
      const paragraphs = content.split("\n\n").filter((p: string) => p.trim());
      const blocks = paragraphs.map((paragraph: string) => {
        const trimmedParagraph = paragraph.trim();

        // Check if it's a heading
        if (trimmedParagraph.startsWith("#")) {
          const level = (trimmedParagraph.match(/^#+/) || [""])[0].length;
          const headingText = trimmedParagraph.replace(/^#+\s*/, "");

          return {
            _type: "block",
            _key: Math.random().toString(36),
            style:
              level === 1
                ? "h1"
                : level === 2
                ? "h2"
                : level === 3
                ? "h3"
                : "h4",
            children: [
              {
                _type: "span",
                _key: Math.random().toString(36),
                text: headingText,
              },
            ],
          };
        }

        // Regular paragraph
        return {
          _type: "block",
          _key: Math.random().toString(36),
          style: "normal",
          children: [
            {
              _type: "span",
              _key: Math.random().toString(36),
              text: trimmedParagraph,
            },
          ],
        };
      });

      // Update the content field
      props.onChange(PatchEvent.from(set(blocks)));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("AI generation failed:", error);
      setError("Échec de la génération du contenu. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack space={3}>
      <Card padding={4} border tone="primary" radius={2}>
        <Stack space={4}>
          <Flex align="center" gap={3}>
            <Box>
              <Text size={3}>🤖</Text>
            </Box>
            <Box flex={1}>
              <Text weight="semibold" size={2}>
                Générateur d'article IA + SEO
              </Text>
            </Box>
            <Badge tone="positive">Groq ⚡</Badge>
          </Flex>

          <Stack space={3}>
            <Box>
              <Text size={1} weight="medium" style={{ marginBottom: "8px" }}>
                Type d'article
              </Text>
              <Select
                value={articleType}
                onChange={(event) => setArticleType(event.currentTarget.value)}
                style={{ width: "100%" }}
              >
                {articleTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.title}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text size={1} weight="medium" style={{ marginBottom: "8px" }}>
                Mots-clés SEO (optionnel)
              </Text>
              <TextInput
                placeholder="ex: React, JavaScript, développement web..."
                value={keywords}
                onChange={(e) => setKeywords(e.currentTarget.value)}
              />
            </Box>

            <Box>
              <Text size={1} weight="medium" style={{ marginBottom: "8px" }}>
                Instructions supplémentaires
              </Text>
              <TextArea
                placeholder="Ajoutez des instructions spécifiques pour personnaliser l'article..."
                value={prompt}
                onChange={(e) => setPrompt(e.currentTarget.value)}
                rows={3}
              />
            </Box>
          </Stack>

          {error && (
            <Card padding={3} tone="critical" radius={2}>
              <Text size={1}>❌ {error}</Text>
            </Card>
          )}

          {success && (
            <Card padding={3} tone="positive" radius={2}>
              <Text size={1}>
                ✅ Article généré avec succès ! N'oubliez pas de remplir les
                autres champs SEO.
              </Text>
            </Card>
          )}

          <Button
            text={
              loading
                ? "Génération en cours..."
                : "✨ Générer l'article complet"
            }
            onClick={generateContent}
            disabled={loading || !title}
            tone="primary"
            loading={loading}
            style={{ width: "100%" }}
          />

          {!title && (
            <Card padding={3} tone="caution" radius={2}>
              <Text size={1}>
                💡 Ajoutez d'abord un titre pour activer la génération
              </Text>
            </Card>
          )}

          <Card padding={3} tone="transparent" radius={2}>
            <Text size={1} muted>
              🎯 L'IA génèrera automatiquement le contenu optimisé SEO en
              français. Vous pourrez ensuite remplir manuellement les autres
              champs (meta description, mots-clés, etc.).
            </Text>
          </Card>
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  );
}

export default AiContentGenerator;
