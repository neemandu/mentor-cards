export type AmplifyDependentResourcesAttributes = {
    "storage": {
        "Invoices": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "GetNextBillingDate": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "GetProviderPlanId": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}