exports.handler = async (event) => {
    var allPackagesDate = new Date();
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
    
    allPackagesDate.setDate(allPackagesDate.getDate()-trialPeriodInDays);   
    return new Date(allPackagesDate);
};
