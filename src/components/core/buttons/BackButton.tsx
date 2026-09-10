import { Button, ButtonText } from "@/gluestack/button";
import { useRouter } from "expo-router";
export default function BackButton({title} : {title: string}) {
    const router = useRouter();
    return (
        <Button onPress={() => router.back()}>
            <ButtonText>{title}</ButtonText>
        </Button>
    )
}
