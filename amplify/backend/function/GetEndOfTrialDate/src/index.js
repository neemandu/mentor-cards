exports.handler = async (event) => {
    var allPackagesDate = new Date();
    var trialPeriodInDays = 14;
    console.log('event.source');
    console.log(event.source);
    var startFreePeriodDate = event.source['createdAt'];
    console.log('startFreePeriodDate');
    console.log(startFreePeriodDate);
    var couponCodes = event.source['couponCodes']
    console.log('couponCodes');
    console.log(couponCodes);
    if(couponCodes &&
        couponCodes.length > 0){
            for(var i = 0 ; i < couponCodes.length ; i++){ 
                if((!couponCodes[i].allowedCardsPacks) || (couponCodes[i].allowedCardsPacks.length == 0)){
                    console.log('couponCodes[i]');
                    console.log(couponCodes[i]);
                    var couponDate = couponCodes[i].createdAt;
                    if(couponDate > startFreePeriodDate){
                        console.log('couponDate > startFreePeriodDate');
                        startFreePeriodDate = couponDate;
                        console.log('startFreePeriodDate');
                        console.log(startFreePeriodDate);
                        trialPeriodInDays = couponCodes[i].trialPeriodInDays;
                        console.log('trialPeriodInDays');
                        console.log(trialPeriodInDays);
                    }
                }
            }
        }
    startFreePeriodDate = new Date(startFreePeriodDate);
    startFreePeriodDate.setDate(startFreePeriodDate.getDate()+trialPeriodInDays); 
    console.log('allPackagesDate');
    console.log(startFreePeriodDate);  
    return new Date(startFreePeriodDate);
};
