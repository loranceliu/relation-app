import React, { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ToastConfig  } from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import Template from '../../template/template';

type ModalContentProps = {
    text: string | undefined
    content?: string | undefined
    element?: React.ReactNode
    onClose: () => void
    onPress?: () => void
};


const Message: React.FC<ModalContentProps> = ({text,content,onClose}) => {

    const {visible} = useSelector((store :any) => store.visible)

    const handlePress = () => {
        onClose()
    }

    return (
        <Modal visible={visible} transparent={true} statusBarTranslucent={true}> 
            <TouchableOpacity onPress={handlePress} style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        <Text style={styles.header}>{text}</Text>
                        <Text style={styles.content}>{content}</Text>
                        <TouchableOpacity style={styles.conform} onPress={handlePress}>
                            <Text style={styles.conformButton}>好的</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

const MessageAcception: React.FC<ModalContentProps> = ({text,content,onClose,onPress}) => {

    const {visible} = useSelector((store :any) => store.visible)

    const handleRefuse = () => {
        onClose()
    }

    const handlePress = () => {
        if(onPress) {
            onPress()
        }
        onClose()
    }

    return (
        <Modal visible={visible} transparent={true} statusBarTranslucent={true}> 
            <TouchableOpacity onPress={handleRefuse} style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        <Text style={styles.header}>{text}</Text>
                        <Text style={styles.content}>{content}</Text>
                        <View style={styles.acceptionContent}>
                            <TouchableOpacity  onPress={handleRefuse}>
                                <Text style={styles.refuseButton}>拒绝</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.conform} onPress={handlePress}>
                                <Text style={styles.acceptButton}>同意</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

const MessageConfirm: React.FC<ModalContentProps> = ({text,content,onClose,onPress}) => {

    const {visible} = useSelector((store :any) => store.visible)

    const handleRefuse = () => {
        onClose()
    }

    const handlePress = () => {
        if(onPress) {
            onPress()
        }
        onClose()
    }

    return (
        <Modal visible={visible} transparent={true} statusBarTranslucent={true}> 
            <TouchableOpacity onPress={handleRefuse} style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        <Text style={styles.header}>{text}</Text>
                        <Text style={styles.content}>{content}</Text>
                        <View style={styles.acceptionContent}>
                            <TouchableOpacity  onPress={handleRefuse}>
                                <Text style={styles.refuseButton}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.conform} onPress={handlePress}>
                                <Text style={styles.acceptButton}>确认</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export const MessageConfig: ToastConfig = {
    normal: ({ text1, text2, props, hide}) => {
        return (
            <Message text={text1} content={text2} onClose={() => hide()} />
        )
    },
    short: ({text1}) => {
        return (
            <View style={styles.shortRoot}>
                <Text style={styles.shortContent}>{text1}</Text>
            </View>
        )
    },
    accept: ({ text1, text2, hide, onPress}) => {
        return (
            <MessageAcception text={text1} content={text2} onClose={() => hide()} onPress={() => onPress()} />
        )
    },
    confirm: ({ text1, text2, hide, onPress}) => {
        return (
            <MessageConfirm text={text1} content={text2} onClose={() => hide()} onPress={() => onPress()} />
        )
    },
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        width: "70%", 
        height: 180,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    header: {
        flex: 2,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black'
    },
    content: {
        flex: 3,
        color: 'black',
        fontSize: 16
    },
    conform: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    conformButton: {
        color: Template.defaultColor,
        fontSize: 16,
        marginRight: 15
    },
    //short
    shortRoot: {
        width: '45%',
        height: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#333333',
        marginBottom: 50
    },
    shortContent: {
        color: '#ffffff',
        textAlign: 'center'
    },
    //accept
    acceptionContent: {
        flexDirection: 'row'
    },
    acceptButton: {
        color: Template.defaultColor,
        fontSize: 16,
        marginRight: 20
    },
    refuseButton: {
        color: 'gray',
        fontSize: 16,
        marginLeft: 20
    },
})