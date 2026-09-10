import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper";
import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { Card } from "@/gluestack/card";
import { Button, ButtonText } from "@/gluestack/button";
import { VStack } from "@/gluestack/vstack";
import { HStack } from "@/gluestack/hstack";
import { Spinner } from "@/gluestack/spinner";
import { Center } from "@/components/ui/center";
import { Plus, ListFilter } from "lucide-react-native";
import { api } from "@/services/api";
import ListCard from "@/components/lists/ListCard";
import CreateListModal from "@/components/lists/CreateListModal";
import EditListModal, { ListData } from "@/components/lists/EditListModal";
import { useRouter } from "expo-router";

export default function ListsPage() {

  const router = useRouter();

  const [lists, setLists] = useState<ListData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingList, setEditingList] = useState<ListData | null>(null);

  const fetchLists = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/lists");
      setLists(res.data);
    } catch (err) {
      console.error("Erro ao buscar listas:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <SafeAreaWrapper className="flex-1 bg-background">
      <Box className="flex-1 px-6 pt-4">

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => (router.canGoBack() ? router.back() : router.navigate("/(app)"))}
          className="mb-4 py-2 self-start"
        >
          <Text className="text-foreground font-medium text-base">← Voltar</Text>
        </TouchableOpacity>

        <HStack className="justify-between items-center mb-6">
          <Heading size="xl" className="text-foreground font-bold">
            Minhas Listas
          </Heading>

          <Button
            onPress={() => setIsCreateOpen(true)}
            className="rounded-2xl px-4 flex-row items-center gap-2 bg-primary"
          >
            <Plus size={18} className="text-background" />
            <ButtonText className="font-bold text-background">Nova Lista</ButtonText>
          </Button>
        </HStack>

        {isLoading ? (
          <Center className="flex-1">
            <Spinner size="large" />
          </Center>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <VStack space="md" className="pb-8 max-w-[650px] mx-auto w-full">
              {lists.length === 0 ? (
                <Card className="p-8 rounded-3xl bg-card border border-border justify-center items-center py-12">
                  <ListFilter size={48} className="text-muted-foreground opacity-40 mb-3" />
                  <Text className="text-muted-foreground text-center font-medium">
                    Nenhuma lista cadastrada.
                  </Text>
                </Card>
              ) : (
                lists.map((list) => {
                  const listId = list._id || list.id || "";
                  return (
                    <ListCard
                      key={listId}
                      list={list}
                      onPress={() =>
                        router.navigate({
                          pathname: "/contents",
                          params: {
                            title: list.title,
                            urls: JSON.stringify(list.urls || []),
                          },
                        })
                      }
                      onEdit={() => setEditingList(list)}
                    />
                  );
                })
              )}
            </VStack>
          </ScrollView>
        )}

        <CreateListModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={fetchLists}
        />

        <EditListModal
          isOpen={Boolean(editingList)}
          list={editingList}
          onClose={() => setEditingList(null)}
          onSuccess={fetchLists}
        />
      </Box>
    </SafeAreaWrapper>
  );
}