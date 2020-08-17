const { SCHEDULER_LAMBDA_ARN, EVENTBRIDGE_RULE_ARN, SCHEDULER_LAMBDA_FUNCTION_NAME } = require("../../constants/aws-config");

const addSchedule = async(feedDataId, time, repeatedDays) => {
    try {
        const minutes = time.split(":")[1];
        const hours = time.split(":")[0];
        const ruleParams = {
            Name: `trigger_${feedDataId}`,
            RoleArn: EVENTBRIDGE_RULE_ARN,
            ScheduleExpression: `cron(${minutes} ${hours} ? * ${repeatedDays} *)`,
            State: "ENABLED",
        };
        const targetParams = {
            Rule: `trigger_${feedDataId}`,
            Targets: [{
                Arn: SCHEDULER_LAMBDA_ARN,
                Id: SCHEDULER_LAMBDA_FUNCTION_NAME,
                Input: JSON.stringify({ key: feedDataId }),
            }, ],
        };

        const ruleResponse = await new Promise((resolve, reject) => {
            cwevents.putRule(ruleParams, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        console.log("Success rule", ruleResponse);
        const lambdaParams = {
            Action: "lambda:InvokeFunction",
            FunctionName: SCHEDULER_LAMBDA_FUNCTION_NAME,
            Principal: "events.amazonaws.com",
            SourceArn: ruleResponse.RuleArn,
            StatementId: `ducks_${feedDataId}`,
        };

        const permissionResponse = await new Promise((resolve, reject) => {
            lambda.addPermission(lambdaParams, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        const targetResponse = await new Promise((resolve, reject) => {
            cwevents.putTargets(targetParams, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = addSchedule;