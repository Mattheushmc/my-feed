import { NavigationContainer } from "@react-navigation/native";
import { SessionProvider } from "@/services/auth/sessionProvider";
import Theme from "@/components/core/Theme";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {

    return (
        <Theme>
            <NavigationContainer>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </NavigationContainer>
        </Theme>
    )
}