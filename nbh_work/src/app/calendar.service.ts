import { Injectable } from '@angular/core';
import {userControl} from "./model/userControl";




@Injectable()
export class CalendarService {
    private ru = {
        firstDayOfWeek: 1,
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Вскр.', 'Пон.', 'Втр.', 'Ср.', 'Чтв.', 'Птн.', 'Сбт.'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
        monthNamesShort: [ 'Янв.', 'Февр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Нояб.', 'Дек.' ],
        today: 'Сегодня',
        clear: 'Очистить'
    };

    public getRange(): string {
        return '2016:' + (new Date()).getFullYear();
    }

    public getRuLocale(): object {
        return this.ru;
    }

    public static normalizeDates(source: object, properties: string[]): object {
        if (!source || !properties) return source;
        properties.filter(p => source[p]).forEach(p => source[p] = new Date(source[p]));
        return source;
    }

    public static normalizeuserControlRes(row: userControl): void {
        CalendarService.normalizeDates(row, ['dateBegin', 'dateEnd']);
    }

}
