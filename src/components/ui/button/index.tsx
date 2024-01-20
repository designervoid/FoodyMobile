import { Button as ButtonBase } from "react-native";

interface Props extends ButtonBase {

}

export function Button(props: Props) {
    return <ButtonBase title="" {...props} />;
}