import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import RssItemCard, { ArticleItem } from "@/components/rss/RssItemCard";
import { Box } from "@/gluestack/box";
import { Card } from "@/gluestack/card";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";
import { api } from "@/services/api";
import { Bookmark } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useRoute } from "expo-router";

export default function BookmarkFolderContentPage() {
  const router = useRouter();
  const route = useRoute();

  const params = (route.params as any) || {};
  const folderId = params.folderId || "";
  const title = params.title || "Pasta";

  let initialItems: ArticleItem[] = [];
  if (params.items) {
    if (typeof params.items === "string") {
      try {
        initialItems = JSON.parse(params.items);
      } catch (e) {
        console.error("Erro ao fazer parse dos itens:", e);
      }
    } else if (Array.isArray(params.items)) {
      initialItems = params.items;
    }
  }

  const [items, setItems] = useState<ArticleItem[]>(initialItems);

  const handleRemoveItem = async (itemId: string) => {
    try {
      await api.delete(`/bookmarks/${folderId}/items`, {
        data: { itemId },
      });
      setItems((prev) => prev.filter((item) => (item._id || item.id) !== itemId));
    } catch (err) {
      console.error("Erro ao remover item da pasta:", err);
    }
  };

  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 px-6 pt-4">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => (router.canGoBack() ? router.back() : router.navigate("/bookmarks"))}
          className="mb-4 py-2 self-start"
        >
          <Text className="text-foreground font-medium text-base">← Voltar</Text>
        </TouchableOpacity>

        <Heading size="xl" className="text-foreground font-bold mb-6">
          {title}
        </Heading>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <VStack space="md" className="pb-8 max-w-[650px] mx-auto w-full">
            {items.length === 0 ? (
              <Card className="p-6 rounded-3xl bg-card border border-border justify-center items-center py-10">
                <Bookmark size={48} className="text-muted-foreground opacity-40 mb-3" />
                <Text className="text-muted-foreground text-center font-medium">
                  Nenhum item salvo nesta pasta.
                </Text>
              </Card>
            ) : (
              items.map((item, index) => {
                const itemId = item._id || item.id || index.toString();
                return (
                  <RssItemCard
                    key={itemId}
                    item={item}
                    onDelete={() => handleRemoveItem(itemId)}
                  />
                );
              })
            )}
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaWrapper>
  );
}