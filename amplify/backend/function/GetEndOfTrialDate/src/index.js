exports.handler = async (event) => {
    var trialPeriodInDays = 14;
    console.log('event.source');
    console.log(event.source);
    var startFreePeriodDate = event.source['createdAt'];
    var couponCodes = event.source['couponCodes']
    console.log('couponCodes');
    console.log(couponCodes);
    if(couponCodes &&
        couponCodes.length > 0){
            for(var i = 0 ; i < couponCodes.length ; i++){ 
                if((!couponCodes[i].allowedCardsPacks) || (couponCodes[i].allowedCardsPacks.length == 0)){
                    var couponDate = couponCodes[i].createdAt;
                    if(couponDate > startFreePeriodDate){
                        startFreePeriodDate = couponDate;
                        trialPeriodInDays = couponCodes[i].trialPeriodInDays;
                    }
                }
            }
        }
    var start = new Date(startFreePeriodDate);
    console.log('start');
    console.log(start);
    start.setDate(start.getDate()+trialPeriodInDays);   
    return new Date(start);
};
