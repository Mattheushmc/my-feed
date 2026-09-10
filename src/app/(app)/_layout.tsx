import { Icon, Label, Stack } from 'expo-router'
import { Platform } from 'react-native'
import { NativeTabs } from 'expo-router/unstable-native-tabs'
import IonIcons from '@expo/vector-icons'
export default function RootLayout() {
    return (

        Platform.OS === 'web' ? (
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(web)/bookmarks' options={{ headerShown: false }} />
                <Stack.Screen name='(web)/folder' options={{ headerShown: false }} />
                <Stack.Screen name='(web)/lists' options={{ headerShown: false }} />
            </Stack>
        ) : (
            <NativeTabs>
                <NativeTabs.Trigger  name='(mobile)/contents'>
                <Label>Contents</Label>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name='(mobile)/player'>
                <Label>Player</Label>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name='(mobile)/rss'>
                <Label>Rss</Label>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name='(mobile)/settings'>
                <Icon/>
                <Label>Settings</Label>
                </NativeTabs.Trigger>
            </NativeTabs>

        )
    )
}