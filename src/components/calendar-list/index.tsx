import { CalendarList as CalendarListBase } from 'react-native-calendars';

export function CalendarList() {
    return <CalendarListBase
        style={{ marginTop: 20 }}
        horizontal={true}
        onDayPress={day => {
            console.log('selected day', day);
        }}
        testID="CalendarList"
    />
}