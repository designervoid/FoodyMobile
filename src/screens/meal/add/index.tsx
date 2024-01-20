import { Button } from "components/ui/button";
import { Select } from "components/ui/select";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

export function MealAddScreen() {
    const insets = useSafeAreaInsets();
    const styles = stylesDynamic(insets);

    return <View style={styles.container}>
        <Select />
        <Button style={styles.button} variant="green">Save</Button>
    </View>;
}

export const stylesDynamic = ({ bottom }: EdgeInsets) => StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        height: Dimensions.get('window').height,
    },
    button: { 
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? bottom : 10,
        width: Dimensions.get('window').width - (30 * 2), 
    }
});