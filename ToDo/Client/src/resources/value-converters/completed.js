export class CompletedValueConverter {
      
       toView(array, value) {
         if(!value){
          return array.filter(item => {
            return !item.completed;
          })
         } else {
           return array;
         }
       }
      }
    