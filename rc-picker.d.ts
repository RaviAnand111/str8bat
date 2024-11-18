// rc-picker.d.ts
import 'rc-picker/lib/PickerPanel';

declare module 'rc-picker/lib/PickerPanel' {
    interface SharedTimeProps<DateType> {
        defaultValue?: DateType | null;
    }
}

