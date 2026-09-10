import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { VStack } from "@/gluestack/vstack";
import { Spinner } from "@/gluestack/spinner";
import { Center } from "@/components/ui/center";
import { Rss } from "lucide-react-native";
import { api } from "@/services/api";
import RssItemCard, { ArticleItem } from "@/components/rss/RssItemCard";
import { useRoute, useRouter } from "expo-router";

export default function ListContentPage() {
  const router = useRouter()
  const route = useRoute()

  const params = (route.params as any) || {};
  const title = params.title || "Lista";

  let urls: string[] = [];
  if (params.urls) {
    if (typeof params.urls === "string") {
      try {
        urls = JSON.parse(params.urls);
      } catch (e) {
        console.error("Erro ao fazer parse das urls:", e);
      }
    } else if (Array.isArray(params.urls)) {
      urls = params.urls;
    }
  }

  const [items, setItems] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListItems = async () => {
      if (!urls || urls.length === 0) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const response = await api.post<ArticleItem[]>("/rss/items", { urls });
        setItems(response.data);
      } catch (err) {
        console.error("Erro ao buscar itens da lista:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListItems();
  }, [urls]);

  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 px-6 pt-4">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => (router.canGoBack() ? router.back() : router.navigate("/lists"))}
          className="mb-4 py-2 self-start"
        >
          <Text className="text-foreground font-medium text-base">← Voltar</Text>
        </TouchableOpacity>

        <Heading size="xl" className="text-foreground font-bold mb-6">
          {title}
        </Heading>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" />
          </Center>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <VStack space="md" className="pb-8 max-w-[650px] mx-auto w-full">
              {items.length === 0 ? (
                <Card className="p-6 rounded-3xl bg-card border border-border justify-center items-center py-10">
                  <Rss size={48} className="text-muted-foreground opacity-40 mb-3" />
                  <Text className="text-muted-foreground text-center font-medium">
                    Nenhum item encontrado nesta lista.
                  </Text>
                </Card>
              ) : (
                items.map((item, index) => (
                  <RssItemCard key={item.siteId || index.toString()} item={item} />
                ))
              )}
            </VStack>
          </ScrollView>
        )}
      </Box>
    </SafeAreaWrapper>
  );
}