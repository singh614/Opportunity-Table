import { LightningElement, wire, track } from 'lwc';
import getOpportunityAll from '@salesforce/apex/AcccountOpportunityController.getOpportunityAll';
import getTotalOpportunityCount from '@salesforce/apex/AcccountOpportunityController.getTotalOpportunityCount';

const columns = [
    { label: 'Opportunity Name', fieldName: 'Name' },
    { label: 'Account Name', fieldName: 'AccountName' },
    { label: 'Account Industry', fieldName: 'AccountIndustry' },
    { label: 'Stage', fieldName: 'StageName' },
    { label: 'Amount', fieldName: 'Amount' },
]
const sampleData = [
    {
        "Id": "006dL0000084V5SQAU",
        "Name": "United Oil Office Portable Generators",
        "AccountId": "001dL00000pJAG1QAO",
        "StageName": "Closed Won",
        "Amount": 5000,
        "Account": {
            "Name": "Shukla Communication",
            "Industry": "Electronics",
            "Id": "001dL00000pJAG1QAO"
        }
    }
]
export default class AccountOpportunity extends LightningElement {
    columns = columns
    data = []
    wiredData = []
    currentPage = 1;
    pageSize = 10;
    totalPages = 0;

    connectedCallback() {
        this.initPagination();
    }

    async initPagination() {
        const total = await getTotalOpportunityCount();
        this.totalPages = Math.ceil(total / this.pageSize);
        this.fetchOpportuntiy();
    }
    async fetchOpportuntiy() {
        let oppData = await getOpportunityAll({ pageSize: this.pageSize, pageNumber: this.currentPage });
        console.log('oppData: ', oppData);
        this.data = this.formatData(oppData)
        console.log('formatted data: ', this.data)
    }
    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchOpportuntiy();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.fetchOpportuntiy();
        }
    }

    get isPreviousDisabled() {
        return this.currentPage === 1;
    }

    get isNextDisabled() {
        return this.currentPage === this.totalPages;
    }
    formatData(data){
        return data.map(item => {
            return {
                Id: item.Id,
                Name: item.Name,
                AccountName: item.Account?.Name,
                AccountIndustry: item.Account?.Industry,
                StageName: item.StageName,
                Amount: item.Amount
            }
        })
    }
}