import {
  Calendar as RNCalendar,
  CalendarProps,
  LocaleConfig,
} from "react-native-calendars";
import { colors, fontFamily } from "../style";
import { ptBR } from "../utils";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export function Calendar({ ...rest }: CalendarProps) {
  return (
    <RNCalendar
      hideExtraDays
      style={{
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
      theme={{
        textMonthFontSize: 18,
        selectedDayBackgroundColor: colors.orange[500],
        selectedDayTextColor: "#000",
        textDayFontFamily: fontFamily.regular,
        monthTextColor: colors.zinc[200],
        arrowColor: colors.zinc[200],
        agendaDayNumColor: colors.zinc[200],
        todayTextColor: colors.zinc[200],
        calendarBackground: "transparent",
        textDayStyle: { color: colors.zinc[200] },
      }}
      {...rest}
    />
  );
}
