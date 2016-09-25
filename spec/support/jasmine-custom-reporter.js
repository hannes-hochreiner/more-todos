export class CustomReporter {
  /** prepend control sequence introducer to ANSI escape code
   * https://en.wikipedia.org/wiki/ANSI_escape_code
   */
  _aec(code) {
    return String.fromCharCode(27) + "[" + code;
  }

  _rewriteLine(line) {
    return this._aec("A") + this._aec("K") + line;
  }

  jasmineStarted(suiteInfo) {
    console.log("Running " + suiteInfo.totalSpecsDefined + " tests");
  }

  suiteStarted(result) {
    console.log(result.description + "...");
  }

  specStarted(result) {
    console.log("   ..." + result.description);
  }

  specDone(result) {
    console.log(this._rewriteLine(`   ...${result.description}...${result.status} (${result.passedExpectations.length} expectation${result.passedExpectations.length == 1 ? "" : "s"})`));

    result.failedExpectations.forEach((failedExpec) => {
      console.log('Failure: ' + failedExpec.message);
      console.log(failedExpec.stack);
    });
  }

  suiteDone(result) {
    // console.log('Suite: ' + result.description + ' was ' + result.status);

    result.failedExpectations.forEach((failedExpec) => {
      console.log('AfterAll ' + failedExpec.message);
      console.log(failedExpec.stack);
    });
  }

  jasmineDone(result) {
    console.log('Finished suite');
  }
}
