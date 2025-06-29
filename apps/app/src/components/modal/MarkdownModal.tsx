import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import Markdown from 'react-native-markdown-display'

type Props = {
    link: string
    label?: string
}

export const MarkdownModal = ({ link, label = '[보기]' }: Props) => {
    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchMarkdown = async () => {
        try {
            setLoading(true)
            setVisible(true)
            const res = await fetch(link)
            const text = await res.text()
            setContent(text)
        } catch {
            // TODO: collect error
            setContent('# 문서를 불러올 수 없습니다.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TouchableOpacity onPress={fetchMarkdown}>
                <Text style={styles.link}>{label}</Text>
            </TouchableOpacity>

            <Modal visible={visible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeText}>← 닫기</Text>
                    </TouchableOpacity>

                    {loading ? (
                        <ActivityIndicator size="large" color="#FF7F50" />
                    ) : (
                        <ScrollView style={{ flex: 1 }}>
                            <Markdown>{content}</Markdown>
                        </ScrollView>
                    )}
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    link: {
        color: '#007AFF',
        fontSize: 14,
        marginLeft: 8,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    closeButton: {
        marginBottom: 16,
    },
    closeText: {
        fontSize: 16,
        color: '#FF7F50',
    },
})
