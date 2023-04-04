import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProvider, Frame, Page, LegacyCard, Layout } from '@shopify/polaris'
import translations from '@shopify/polaris/locales/en.json'
import '@shopify/polaris/build/esm/styles.css'
import Cart from './components/Cart'

function App() {
    const client = new QueryClient()
    return (
        <QueryClientProvider client={client}>
            <AppProvider i18n={translations}>
                <Frame>
                    <Page>
                        <Layout>
                            <LegacyCard>
                                <LegacyCard.Section>
                                    <Cart />
                                </LegacyCard.Section>
                            </LegacyCard>
                        </Layout>
                    </Page>
                </Frame>
            </AppProvider>
        </QueryClientProvider>
    )
}

export default App
