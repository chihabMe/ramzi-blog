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
  Box,
  Container,
  Heading,
  Code,
} from "@sanity/ui";
import { useClient } from "sanity";

export function AiWriterTool() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [keywords, setKeywords] = useState("");
  const [articleType, setArticleType] = useState("tutoriel");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  const client = useClient({ apiVersion: '2024-01-01' });

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
      setError("Veuillez saisir un titre");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedContent(null);

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

      const result = await response.json();
      setGeneratedContent(result);
    } catch (error) {
      console.error("AI generation failed:", error);
      setError("Échec de la génération du contenu. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copié dans le presse-papiers !");
  };

  const createPost = async () => {
    if (!generatedContent) return;

    setSaving(true);
    setError("");

    try {
      // Convert markdown content to Sanity blocks
      const contentBlocks = generatedContent.content
        .split('\n\n')
        .filter((paragraph: string) => paragraph.trim())
        .map((paragraph: string) => {
          // Handle headers
          if (paragraph.startsWith('# ')) {
            return {
              _type: 'block',
              style: 'h1',
              children: [{ _type: 'span', text: paragraph.replace('# ', '') }]
            };
          }
          if (paragraph.startsWith('## ')) {
            return {
              _type: 'block',
              style: 'h2',
              children: [{ _type: 'span', text: paragraph.replace('## ', '') }]
            };
          }
          if (paragraph.startsWith('### ')) {
            return {
              _type: 'block',
              style: 'h3',
              children: [{ _type: 'span', text: paragraph.replace('### ', '') }]
            };
          }

          // Handle regular paragraphs
          return {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: paragraph }]
          };
        });

      // Create slug from title
      const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-') 
        .replace(/-+/g, '-') 
        .trim();

      const newPost = {
        _type: 'post',
        title: title,
        slug: {
          _type: 'slug',
          current: slug
        },
        metaDescription: generatedContent.metaDescription,
        keywords: generatedContent.keywords,
        excerpt: generatedContent.excerpt,
        body: contentBlocks,
        publishedAt: new Date().toISOString(),
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString()
      };

      const result = await client.create(newPost);
      
      alert("✅ Article créé avec succès dans Sanity !");
      
      // Reset form after successful creation
      setGeneratedContent(null);
      setTitle("");
      setPrompt("");
      setKeywords("");
      
    } catch (error: any) {
      console.error('Error creating post:', error);
      let errorMessage = "Erreur lors de la création de l'article.";
      
      if (error.message?.includes('authorization')) {
        errorMessage = "Erreur d'autorisation. Vérifiez vos permissions Sanity.";
      } else if (error.message?.includes('validation')) {
        errorMessage = "Erreur de validation. Vérifiez le format des données.";
      } else if (error.message?.includes('network')) {
        errorMessage = "Erreur réseau. Vérifiez votre connexion.";
      }
      
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container width={4} style={{ padding: "2rem" }}>
      <Stack space={6}>
        <Box>
          <Heading as="h1" size={4}>
            🤖 Générateur d'articles IA
          </Heading>
          <Text muted>Générez des articles optimisés SEO en français avec Groq</Text>
        </Box>

        <Card padding={4} border radius={2}>
          <Stack space={4}>
            <Heading as="h2" size={2}>
              Configuration de l'article
            </Heading>

            <Box>
              <Text size={1} weight="medium" style={{ marginBottom: "8px" }}>
                Titre de l'article
              </Text>
              <TextInput
                placeholder="ex: Guide complet de React 18"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Box>

            <Box>
              <Text size={1} weight="medium" style={{ marginBottom: "8px" }}>
                Type d'article
              </Text>
              <Select
                value={articleType}
                onChange={(event) => setArticleType(event.currentTarget.value)}
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
                Instructions supplémentaires (optionnel)
              </Text>
              <TextArea
                placeholder="Ajoutez des instructions spécifiques pour personnaliser l'article..."
                value={prompt}
                onChange={(e) => setPrompt(e.currentTarget.value)}
                rows={4}
              />
            </Box>

            {error && (
              <Card padding={3} tone="critical" radius={2}>
                <Text size={1}>❌ {error}</Text>
              </Card>
            )}

            <Button
              text={loading ? "Génération en cours..." : "✨ Générer l'article"}
              onClick={generateContent}
              disabled={loading || !title}
              tone="primary"
              loading={loading}
              style={{ width: "100%" }}
            />
          </Stack>
        </Card>

        {generatedContent && (
          <Card padding={4} border radius={2} tone="positive">
            <Stack space={4}>
              <Heading as="h2" size={2}>
                ✅ Article généré avec succès !
              </Heading>

              <Card padding={3} tone="transparent" border>
                <Stack space={3}>
                  <Text weight="semibold">📄 Options :</Text>
                  <Text size={1}>
                    • Cliquez sur "Sauvegarder" pour créer directement l'article dans Sanity
                    <br />
                    • Ou copiez les informations individuellement pour un contrôle manuel
                  </Text>
                </Stack>
              </Card>

              <Stack space={3}>
                <Box>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold">Titre:</Text>
                    <Button
                      text="Copier"
                      tone="primary"
                      mode="ghost"
                      onClick={() => copyToClipboard(title)}
                    />
                  </Flex>
                  <Card padding={2} tone="transparent" style={{ marginTop: "4px" }}>
                    <Code size={1}>{title}</Code>
                  </Card>
                </Box>

                <Box>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold">Meta Description:</Text>
                    <Button
                      text="Copier"
                      tone="primary"
                      mode="ghost"
                      onClick={() => copyToClipboard(generatedContent.metaDescription)}
                    />
                  </Flex>
                  <Card padding={2} tone="transparent" style={{ marginTop: "4px" }}>
                    <Code size={1}>{generatedContent.metaDescription}</Code>
                  </Card>
                </Box>

                <Box>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold">Slug:</Text>
                    <Button
                      text="Copier"
                      tone="primary"
                      mode="ghost"
                      onClick={() => copyToClipboard(generatedContent.slug)}
                    />
                  </Flex>
                  <Card padding={2} tone="transparent" style={{ marginTop: "4px" }}>
                    <Code size={1}>{generatedContent.slug}</Code>
                  </Card>
                </Box>

                <Box>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold">Mots-clés:</Text>
                    <Button
                      text="Copier"
                      tone="primary"
                      mode="ghost"
                      onClick={() => copyToClipboard(generatedContent.keywords?.join(", ") || "")}
                    />
                  </Flex>
                  <Card padding={2} tone="transparent" style={{ marginTop: "4px" }}>
                    <Code size={1}>{generatedContent.keywords?.join(", ")}</Code>
                  </Card>
                </Box>

                <Box>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold">Extrait:</Text>
                    <Button
                      text="Copier"
                      tone="primary"
                      mode="ghost"
                      onClick={() => copyToClipboard(generatedContent.excerpt)}
                    />
                  </Flex>
                  <Card padding={2} tone="transparent" style={{ marginTop: "4px" }}>
                    <Code size={1}>{generatedContent.excerpt}</Code>
                  </Card>
                </Box>

                <Box>
                  <Flex justify="space-between" align="center">
                    <Text weight="semibold">Contenu (Markdown):</Text>
                    <Button
                      text="Copier"
                      tone="primary"
                      mode="ghost"
                      onClick={() => copyToClipboard(generatedContent.content)}
                    />
                  </Flex>
                  <Card padding={2} tone="transparent" style={{
                      marginTop: "4px",
                      maxHeight: "300px", overflow: "auto" }}>
                    <Code size={1} style={{ whiteSpace: "pre-wrap" }}>
                      {generatedContent.content.substring(0, 500)}...
                    </Code>
                  </Card>
                </Box>
              </Stack>

              <Flex justify="space-between" align="center">
                <Button
                  text={saving ? "Sauvegarde..." : "💾 Sauvegarder l'article"}
                  onClick={createPost}
                  disabled={saving}
                  loading={saving}
                  tone="positive"
                  style={{ flex: 1, marginRight: "8px" }}
                />
                <Button
                  text="📋 Copier tout"
                  onClick={() => {
                    const fullContent = `Titre: ${title}\n\nMeta Description: ${generatedContent.metaDescription}\n\nSlug: ${generatedContent.slug}\n\nMots-clés: ${generatedContent.keywords?.join(", ")}\n\nExtrait: ${generatedContent.excerpt}\n\nContenu:\n${generatedContent.content}`;
                    copyToClipboard(fullContent);
                  }}
                  tone="primary"
                  mode="ghost"
                  style={{ flex: 1, marginLeft: "8px" }}
                />
              </Flex>

              <Button
                text="🔄 Générer un nouvel article"
                onClick={() => {
                  setGeneratedContent(null);
                  setTitle("");
                  setPrompt("");
                  setKeywords("");
                }}
                tone="default"
                style={{ width: "100%" }}
              />
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
}

export default AiWriterTool;
