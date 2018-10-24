// Shamelessly copied from my friend kigiri's JS-Training project
// https://github.com/nan-academy/js-training/blob/master/tester
// extend str for colors
'no0.blk30.red31.grn32.ylw33.blu34.mgt35.cyn36.wht37'
  .split('.')
  .map(str => str.split(/([0-9]+)$/))
  .forEach(([ name, value ]) => {
    String.prototype[name]       = function () { return `\u001b[${value}m${this}\u001b[0m` }
    String.prototype[`_${name}`] = function () { return `\u001b[${value};1m${this}\u001b[0m` }
  })

class JestCheckCrossReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }

    onRunStart(test) {
        console.log();
        console.log(`Found ${test.numTotalTestSuites} test suites`);
    }

    onRunComplete(test, results) {
        const {
            numFailedTests,
            numPassedTests,
            numPendingTests,
            testResults,
            numTotalTests,
            startTime
        } = results;

        console.log();
        testResults.map(({failureMessage}) => {
            if (failureMessage) {
                console.log(failureMessage);
            }
        });

        console.log(`Ran ${numTotalTests} tests in ${testDuration()}`);
        process.stdout.write(` ${numPassedTests || 0} passing`);
        process.stdout.write(` ${numFailedTests || 0} failing`);
        process.stdout.write(` ${numPendingTests || 0} pending`);
        console.log();

        function testDuration() {
            const end = new Date();
            const start = new Date(startTime);

            const seconds = (end - start) / 1000;
            return `${seconds} s`;
        }
    }

    onTestResult(test, testResult) {
        for (var i = 0; i < testResult.testResults.length; i++) {
            const fullName = testResult.testResults[i].fullName
            if (testResult.testResults[i].status === 'passed') {
                process.stdout.write('✓ PASS '.grn() + ` ${fullName}\n`);
            } else if (testResult.testResults[i].status === 'pending') {
                process.stdout.write('- SKIP '.cyn() + ` ${fullName}\n`);
            } else {
                process.stdout.write('✗ FAIL '.red() + ` ${fullName}\n`);
            }
        }
    }
}

module.exports = JestCheckCrossReporter;
