import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "types";

export function useTypedNavigation<T extends keyof RootStackParamList>() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, T>>();

    return navigation;
}