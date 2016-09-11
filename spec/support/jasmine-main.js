import {default as Jasmine} from 'jasmine';
import {CustomReporter} from "./jasmine-custom-reporter";
var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.env.addReporter(new CustomReporter());

jasmine.onComplete(function (passed, t1, t2, t3) {
   if (passed) {
       console.log('Success');
   } else {
       console.error("Failed");
   }
});

jasmine.execute();
