
function getBillingEndDateByUser(startDate, subscriptionPlan) {
    console.log('getBillingEndDate');
    var cycles = subscriptionPlan.billingCycleInMonths;
    console.log('cycles isx: ' + cycles);
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

function monthDiff(d1, d2) {
    var months;
    var date1 = new Date(d1);
    var date2 = new Date(d2);
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    if(date2.getDate() < date1.getDate()){
        months--;
    }
    return months <= 0 ? 0 : months;
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
    var date = getBillingEndDateByUser(startDate, subscriptionPlan);
    return date;
};
