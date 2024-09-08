import { useEffect, useState } from "react"
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle } from "react-native"

interface SelectorProps {
    title?: string;
    h?: any
    w?: any
    isVisible: boolean,
    children: React.ReactNode,
    onClose?: () => void
}

const CommonModal: React.FC<SelectorProps> = ({title,w,h,children,isVisible,onClose}) => {


    const [visible,setVisible] = useState(isVisible)

    const modalContent: ViewStyle[] = [
        styles.modalContent,
        { height: h ?? 200, width: w ?? "70%" } 
    ];

    const closeModal = () => {
        setVisible(false)
        onClose?.()
    }

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    return (
        <Modal visible={visible} animationType="fade" transparent={true} statusBarTranslucent={true}>
            <TouchableOpacity onPress={closeModal} style={styles.modalContainer}>
                <TouchableWithoutFeedback>
                    <View style={modalContent}>
                        {title && <Text style={styles.header}>{title}</Text>}
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'black'
    },
    text: {
        color:'#A9A9A9',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 4,
        fontSize: 16
    }
});

export default CommonModal