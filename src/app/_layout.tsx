import AppLayout from '@/components/core/App'
import { Stack } from 'expo-router'

export default function RootLayout() {
     return (
        <AppLayout>
            <Stack>
                <Stack.Screen name='(auth)' options={{headerShown: false }}/>
                <Stack.Screen name='about' options={{headerShown: false}}/> 
            </Stack>
        </AppLayout>
        
    )
}