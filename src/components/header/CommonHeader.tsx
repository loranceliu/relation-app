import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import Template from "../../template/template"
import Icon from "../../utils/Icon/Icon"

interface BackProps  {
    back: () => void
}

interface MainProps {
    do?: () => void
}

interface OperateProps  {
    operate?: () => void
}

const CommonHeader = (BackComponent?: React.ComponentType<BackProps>,MainComponent?: React.ComponentType<MainProps>,OperationComponent?: React.ComponentType<OperateProps>) => {

    const Component: React.FC<BackProps & MainProps & OperateProps> = (props) => {
        return (
            <View style={styles.root}>
                <View style={styles.back}>
                    {BackComponent ? (
                        <BackComponent {...props as BackProps} /> 
                    ) : (
                        <TouchableOpacity onPress={props.back}>
                            <Icon name='back' color="#ffffff" size={23} />
                        </TouchableOpacity>
                    )} 
                </View>
                <View style={styles.children}>
                    {MainComponent &&
                        <MainComponent {...props as MainProps} />
                    }
                </View>
                <View style={styles.target}>
                    {OperationComponent &&
                        <OperationComponent {...props as OperateProps} />
                    }
                </View>
            </View>
        )
    }

    return Component

}

const styles = StyleSheet.create({
    root: {
        backgroundColor: Template.defaultColor,
        paddingTop: 45,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    back: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    children: {
        flex: 6,
        height: 32,
        justifyContent: 'center',
        alignItems:'center'
    },
    target: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CommonHeader