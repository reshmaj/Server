import moment from 'moment';

export class DateFormatValueConverter {
toView(value, format='MM-DD-YYYY') {
if(value === undefined || value === null){
	return;
    		}
    
    		return moment(value).format(format);
	}
}
