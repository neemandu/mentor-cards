
function getBillingEndDate(startDate, subscriptionPlan) {
    console.log('getBillingEndDate');
    var cycles = subscriptionPlan.billingCycleInMonths;
    console.log('cycles is: ' + cycles);
    var createdAt = new Date(startDate);
    console.log('Subscription started at: ');
    console.log(createdAt);
    var now = new Date();
    var monthsDiff = monthDiff(createdAt, now);
    console.log('monthsDiff is: ' + monthsDiff);
    var numOfCycles = Math.floor(monthsDiff / cycles) + 1;
    console.log('numOfCycles is: ' + numOfCycles);
    var numberOfMonthsToAdd = numOfCycles * cycles;
    console.log('numberOfMonthsToAdd is: ' + numberOfMonthsToAdd);
    var endDate = new Date(createdAt);
    endDate.setMonth(endDate.getMonth()+numberOfMonthsToAdd);
    console.log('endDate is: ');
    console.log(endDate);
    return endDate;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log('GetNextBillingDate');
    console.log('event');
    console.log(event);
    var startDate = event.source['startDate'];
    var subscriptionPlan = event.source['subscriptionPlan'];
    var date = getBillingEndDate(startDate, subscriptionPlan);
    return date;
};
