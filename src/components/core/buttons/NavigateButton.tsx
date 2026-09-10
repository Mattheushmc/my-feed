import { Button, ButtonText } from "@/gluestack/button";
import { useRouter } from "expo-router";
interface NavigateButtonProps {
  route: any;
  title: string;
  variant?: "default" | "outline" | "link";
}

export default function NavigateButton({
  route,
  title,
  variant = "default",
}: NavigateButtonProps) {

  const router = useRouter()
  return (
    <Button
      variant={variant}
      className="rounded-xl px-4 py-2"
      onPress={() => router.navigate(route)}
    >
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}