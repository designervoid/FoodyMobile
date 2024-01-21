import React, { useRef, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useStore} from '@nanostores/react';
import { selectedValue, setSelectedValue, buttonPosition, setButtonPosition, modalVisible, setModalVisible, setSelectedValueRepository  } from 'stores';
import { Platform } from 'react-native';
import { useGetFoodTypes } from 'repository';

export function Select() {
    const buttonRef = useRef<TouchableOpacity>(null);
    const currentValue = useStore(selectedValue);
    const currentPosition = useStore(buttonPosition);
    const visible = useStore(modalVisible);
    const { data, isLoading, error } = useGetFoodTypes();

    const options = useMemo(() => {
        return data?.map((item) => ({ name: item.name, id: item.id}));
    }, [data]);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.measure((_, __, width, height, px, py) => {
                setButtonPosition({ x: px, y: py, width, height });
            });
        }
    }, []);

    useEffect(() => {
        if (error) {
            setSelectedValue('Something wrong...');
        }
    }, [error]);

    useEffect(() => {
        if (!isLoading && !error) {
            if (!currentValue) setSelectedValue('Choose the option');
            else {
                setSelectedValue(currentValue);
            }
        }
    }, [isLoading, error, currentValue]);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                ref={buttonRef}
                onPress={() => setModalVisible(true)} 
                style={styles.touchable}
                disabled={isLoading || error}
            >
                <Text style={styles.selectedText}>{currentValue}</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View 
                                style={[
                                    styles.modalView,
                                    { top: Platform.OS === 'ios' ? currentPosition.y + currentPosition.height + 70 + 5  : currentPosition.y + (currentPosition.y / 4) + 5 }
                                ]}
                            >
                                {options?.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.option}
                                        onPress={() => {
                                            setSelectedValue(option.name);
                                            setSelectedValueRepository(option.id);
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.optionText}>{option.name}</Text>
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
        paddingHorizontal: 30,
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
