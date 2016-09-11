export class CustomReporter {
  jasmineStarted(suiteInfo) {
    console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
  }

  suiteStarted(result) {
    console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
  }

  specStarted(result) {
    console.log('Spec started: ' + result.description + ' whose full description is: ' + result.fullName);
  }

  specDone(result) {
    console.log('Spec: ' + result.description + ' was ' + result.status);

    result.failedExpectations.forEach((failedExpec) => {
      console.log('Failure: ' + failedExpec.message);
      console.log(failedExpec.stack);
    });

    console.log(result.passedExpectations.length);
  }

  suiteDone(result) {
    console.log('Suite: ' + result.description + ' was ' + result.status);

    result.failedExpectations.forEach((failedExpec) => {
      console.log('AfterAll ' + failedExpec.message);
      console.log(failedExpec.stack);
    });
  }

  jasmineDone(result) {
    console.log('Finished suite');
  }
}
