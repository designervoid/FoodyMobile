import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback, MeasureOnSuccessCallback } from 'react-native';

type ParametersMeasureOnSuccessCallback = Parameters<MeasureOnSuccessCallback>;

type ButtonPosition = {
    width: ParametersMeasureOnSuccessCallback[2];
    height: ParametersMeasureOnSuccessCallback[3];
    x: ParametersMeasureOnSuccessCallback[4];
    y: ParametersMeasureOnSuccessCallback[5];
}

export function Select() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Choose the option");
    const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({} as unknown as ButtonPosition);
    const buttonRef = useRef<TouchableOpacity>(null);

    const options = ["Breakfast", "Lunch", "Dinner"];

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.measure((fx, fy, width, height, px, py) => {
                setButtonPosition({ x: px, y: py, width, height });
            });
        }
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                ref={buttonRef}
                onPress={() => setModalVisible(true)} 
                style={styles.touchable}
            >
                <Text style={styles.selectedText}>{selectedValue}</Text>
            </TouchableOpacity>

            {selectedValue !== "Choose the option" && (
                <Text style={styles.selectedOptions}>Selected: {selectedValue}</Text>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View 
                                style={[
                                    styles.modalView,
                                    { top: buttonPosition.y + buttonPosition.height + 70 }
                                ]}
                            >
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.option}
                                        onPress={() => {
                                            setSelectedValue(option);
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5,
    },
    touchable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedText: {
        fontSize: 16,
        color: 'black',
        flex: 1,
    },
    selectedOptions: {
        marginTop: 10,
        fontSize: 14,
        color: 'grey',
    },
    modalView: {
        position: 'absolute',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: Dimensions.get('window').width - 40,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'rgba(0,0,0,0.5)',
    },
    option: {
        backgroundColor: '#F2F2F2',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: '100%',
    },
    optionText: {
        fontSize: 16,
        color: 'black',
    },
});
