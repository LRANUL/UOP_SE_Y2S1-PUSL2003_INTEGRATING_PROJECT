import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yoyyabytes'];

@Pipe({
    name: 'fileSizePipe'
})

export class FileSizeFormatPipe implements PipeTransform {

    static forRoot() {
        throw new Error("Method is not implemented");
    }

    transform(sizeInBytes: number, longForm: boolean): string {
            const units = longForm
                ? FILE_SIZE_UNITS_LONG
                : FILE_SIZE_UNITS;
            let power = Math.round(Math.log(sizeInBytes)/Math.log(1024));
        power = Math.min(power, units.length - 1);
        const size = sizeInBytes /Math.pow(1024, power); // Size converted to new units
        const formattedSize = Math.round(size * 100) / 100; // Rounding the size to a rounded value
        const unit = units[power];

        return formattedSize + unit;
    }
}