import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import CheckBox from '@react-native-community/checkbox'

import { register, getAgreements } from '@/api'
import { setToken } from '@/stores'
import { RegisterScreenProps } from '@/types'
import { IDocument, isErrorResponse } from '@fienmee/types/api'
import { BE_URL } from '@/config'
import { MarkdownModal } from '@/components/modal/MarkdownModal'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export function RegisterScreen({ route }: RegisterScreenProps) {
    const navigation = useNavigation<RegisterScreenProps['navigation']>()

    const [documents, setDocuments] = useState<IDocument[]>([])
    const [agreements, setAgreements] = useState<Record<string, boolean>>({})

    useEffect(() => {
        async function fetchDocuments() {
            const result = await getAgreements()
            setDocuments(result.documents)

            const initial = Object.fromEntries(result.documents.map((d: IDocument) => [d.name, false]))
            setAgreements(initial)
        }

        fetchDocuments()
    }, [])

    const toggleAgreement = (name: string) => {
        setAgreements(prev => ({ ...prev, [name]: !prev[name] }))
    }

    const allRequiredAgreed = documents.filter(d => d.required).every(d => agreements[d.name])

    const onPress = async () => {
        try {
            const credential = await register({
                accessToken: route.params.accessToken,
                refreshToken: route.params.refreshToken,
                provider: route.params.provider,
            })
            await setToken(credential)
            navigation.navigate('WebView')
        } catch (error) {
            if (isErrorResponse(error)) {
                navigation.navigate('Error', error)
            } else {
                navigation.navigate('Error', {
                    message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
                })
            }
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 10,
                paddingTop: 60,
                paddingBottom: 80,
                backgroundColor: '#fff',
            }}
            style={[styles.container, { padding: 30, backgroundColor: '#FFFFFF' }]}
        >
            <View
                style={{
                    width: '100%',
                    margin: 30,
                    alignItems: 'stretch',
                    alignSelf: 'center',
                }}
            >
                <View style={{ marginBottom: 32, marginTop: 40 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>회원가입을 시작합니다</Text>
                    <Text style={{ fontSize: 16, color: '#666' }}>서비스를 이용하려면 아래 약관에 동의해주세요.</Text>
                </View>
                <View style={{ marginBottom: 60, borderBottomColor: '#eee', borderBottomWidth: 1 }} />

                {documents.map(doc => (
                    <View key={doc.name} style={{ flexDirection: 'row' }}>
                        <CheckBox value={agreements[doc.name]} onValueChange={() => toggleAgreement(doc.name)} />
                        <Text>
                            {doc.name} {doc.required && '(필수)'}
                        </Text>
                        <MarkdownModal link={`${BE_URL}/${doc.path}`} />
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={onPress} disabled={!allRequiredAgreed}>
                <View
                    style={{
                        backgroundColor: allRequiredAgreed ? '#FF7F50' : '#dddddd',
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginTop: 24,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>회원 가입</Text>
                </View>
            </TouchableOpacity>
            {/* 하단 여백 */}
            <View style={{ height: 50 }} />
        </ScrollView>
    )
}
