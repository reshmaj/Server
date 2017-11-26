import moment from 'moment';
export class DateFormatValueConverter {
toView(value, format = 'MMM Do YYY') {
if(value === undefined || value === null){
	return;
    		}
    
    		return moment(value).format(format);
	}
}


