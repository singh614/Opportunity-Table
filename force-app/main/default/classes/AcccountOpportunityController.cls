public with sharing class AcccountOpportunityController {
	@AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityAll(Integer pageSize, Integer pageNumber) {
        Integer offsetVal = (pageNumber - 1) * pageSize;
        System.debug('Inside getOpportunityAll() method');
        return [
            SELECT Id, Name, Account.Name, Account.Industry, StageName, Amount 
            FROM Opportunity
            ORDER BY CreatedDate DESC
            LIMIT :pageSize OFFSET :offsetVal
		];
    }
    @AuraEnabled(cacheable=true)
    public static Integer getTotalOpportunityCount() {
        return [SELECT COUNT() FROM Opportunity];
    }
}