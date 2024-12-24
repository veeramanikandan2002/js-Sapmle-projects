class ExpenceChecker {
    constructor() {
        this.dateinput = document.getElementById("dateInput");
        this.summeryInput = document.getElementById("summery");
        this.amountInput = document.getElementById("amount");
        this.income = document.getElementById("income");
        this.expence = document.getElementById("expence");
        this.catogeryInput = document.getElementById("Category");
        this.submitBtn = document.getElementById("submit")
        this.myform = document.getElementById('form')
        this.firstRow = document.getElementById("first-tr");
        this.seconddform = document.getElementById("secondd-form")
        this.filteCategory = document.getElementById("filter-category")
        this.balanceAmount = document.getElementById("balance-amount")
        this.AllValues = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
        this.total = 0

    }

    submit() {

        if (!this.dateinput.value || !this.summeryInput.value || !this.amountInput.value || !this.catogeryInput.value) {
           expence.datefun()
            expence.summery()
            expence.amount()
            expence.typeChecking()
            expence.catogery()
        }
        else {
            expence.insertTable();
            expence.setValues();
            expence.remaingBalance()
            expence.myform.reset()

            expence.chart(this.AllValues)
        }
    }

    insertTable() {
        const table = document.getElementById('table');
        let newRow = table.insertRow()

        let td1 = newRow.insertCell(0);
        let td2 = newRow.insertCell(1);
        let td3 = newRow.insertCell(2);
        let td4 = newRow.insertCell(3);
        let td5 = newRow.insertCell(4);

        td1.innerHTML = this.datefun();
        td2.innerHTML = this.summery()
        if (this.typeChecking() == "income") {
            td3.innerHTML = this.amountInput.value
            td3.style.color = 'green'
        } else {
            td4.innerHTML = this.amountInput.value;
            td4.style.color = 'red'

        }
        td5.innerHTML = this.balance();

    }


    datefun() {
        const datePara = document.getElementById("date-para")
        if (this.dateinput.value == "") {
            datePara.innerHTML = "Enter the field"
            this.dateinput.style.border = "1px solid red"
        }
        else {
            datePara.innerHTML = ""
            this.dateinput.style.border = ""
            return this.dateinput.value
        }
    }

    summery() {
        const summeryPara = document.getElementById("summery-para")
        let checkstr = /^[A-Za-z]+$/;

        if (!checkstr.test(this.summeryInput.value)) {
            summeryPara.innerHTML = "Enter the field"
            this.summeryInput.style.border = "1px solid red"
        }
        else {
            summeryPara.innerHTML = ""
            this.summeryInput.style.border = ""
            return this.summeryInput.value

        }
    }
    amount() {
        const numCheck = /^\d+$/
        const amountpara = document.getElementById("amount-para")
        if (!numCheck.test(this.amountInput.value)) {
            amountpara.innerHTML = "Enter the field"
            this.amountInput.style.border = "1px solid red"
        }
        else {
            amountpara.innerHTML = ""
            this.amountInput.style.border = ""
            return this.amountInput.value
        }

    }
    typeChecking() {
        if (this.income.checked) {
            return this.income.value
        }
        else {
            return this.expence.value
        }
    }

    catogery() {

        if (this.catogeryInput.value == "") {
            console.log("value is empty")
        }
        else {
            return this.catogeryInput.value
        }
    }


    balance() {
        if (this.income.checked) {
            this.total += Number(this.amountInput.value)
        }
        else {
            this.total = this.total - Number(this.amountInput.value)
        }
        return this.total;
    }





    setValues() {
        let obj = {}
        obj["date"] = this.datefun()
        obj["summery"] = this.summery()
        obj["amount"] = this.amount()
        obj["typeChecking"] = this.typeChecking()
        obj["categery"] = this.catogery()
        obj["balance"] = this.total
        this.AllValues.push(obj);
        localStorage.setItem("items", JSON.stringify(this.AllValues))

    }


    createElement(value) {

        value.forEach((elem, i) => {
            const table = document.getElementById('table');
            let newRow = table.insertRow(i + 1);

            let td1 = newRow.insertCell(0);
            let td2 = newRow.insertCell(1);
            let td3 = newRow.insertCell(2);
            let td4 = newRow.insertCell(3);
            let td5 = newRow.insertCell(4);

            td1.innerHTML = elem.date;
            td2.innerHTML = elem.summery
            if (elem.typeChecking == "income") {
                td3.innerHTML = elem.amount
                td3.style.color = 'green'
            } else {
                td4.innerHTML = elem.amount
                td4.style.color = 'red'
            }
            td5.innerHTML = elem.balance
        })
    }


    intialLoad() {
        this.createElement(this.AllValues)
        this.remaingBalance()
        this.chart(this.AllValues)

    }
    remaingBalance() {
        this.AllValues.forEach((elem) => {
            this.balanceAmount.innerHTML = elem.balance
            this.total = elem.balance
        })

    }



    allchecked() {

        const allchecked = document.getElementById("All")
        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }
        if (allchecked.checked) {
            allchecked.checked
            this.createElement(this.AllValues)
            this.chart(this.AllValues)
        }
    }



    incomechecked() {
        let chartValues = [];
        const incomeChecked = document.getElementById("Income")

        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }
        if (incomeChecked.checked) {
            this.AllValues.forEach((elem) => {

                if (elem.typeChecking == "income") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })
        }
        this.chart(chartValues)
    }


    expenceChecked() {
        let chartValues = [];
        const expenceChecked = document.getElementById("Expence")
        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }
        if (expenceChecked.checked) {

            this.AllValues.forEach((elem) => {

                if (elem.typeChecking == "expence") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })
        }
        this.chart(chartValues)
    }
    loanChecked() {
        let chartValues = [];

        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }

        if (this.filteCategory.value == "Loan") {

            this.AllValues.forEach((elem) => {
                if (elem.categery == "Loan") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })
        }
        this.chart(chartValues)
    }
    Salary() {
        let chartValues = [];
        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }

        if (this.filteCategory.value == "Salary") {

            this.AllValues.forEach((elem) => {

                if (elem.categery == "Salary") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })
        }
        this.chart(chartValues)
    }

    shopping() {
        let chartValues = [];
        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }

        if (this.filteCategory.value == "Shopping") {

            this.AllValues.forEach((elem) => {
                if (elem.categery == "Shopping") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })

        }
        this.chart(chartValues)
    }

    Education() {
        let chartValues = [];
        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }

        if (this.filteCategory.value == "Eduction") {

            this.AllValues.forEach((elem) => {
                if (elem.categery == "Eduction") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })
        }
        this.chart(chartValues)
    }
    HouseRent() {
        let chartValues = [];
        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }

        if (this.filteCategory.value == "House") {

            this.AllValues.forEach((elem) => {
                if (elem.categery == "House") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })
        }
        this.chart(chartValues)
    }

    misselenious() {
        let chartValues = [];
        for (let i = 0; i < this.AllValues.length; i++) {
            this.firstRow.nextElementSibling?.remove()
        }
        if (this.filteCategory.value == "Misselenious") {

            this.AllValues.forEach((elem) => {
                if (elem.categery == "misselenious") {
                    this.createElement([elem])
                    chartValues.push(elem)
                }
            })
        }
        this.chart(chartValues)
    }


    categeryfun() {
        if (this.filteCategory.value == "All") {

            this.allchecked()
        }
        else if (this.filteCategory.value == "Loan") {
            this.loanChecked()
        }
        else if (this.filteCategory.value == "Salary") {
            this.Salary()
        }
        else if (this.filteCategory.value == "Shopping") {
            this.shopping()
        }
        else if (this.filteCategory.value == "Eduction") {
            this.Education()
        }
        else if (this.filteCategory.value == "House") {
            this.HouseRent()
        }
        else if (this.filteCategory.value == "Misselenious") {
            this.misselenious()
        }
    }

    chart(values) {

        const chartdiv = document.getElementById("chart-div")

        let chartLabel = []
        let chartData = []

        values.forEach((elem) => {

            chartLabel.push(elem.date)

            chartData.push(elem.balance)
        })
        chartdiv.innerHTML = ""
        let mychart = document.createElement('canvas');

        mychart = document.createElement('canvas');
        mychart.setAttribute("id", "mychart")
        mychart.style.height = "300px";
        mychart.style.width = "500px";
        chartdiv.append(mychart)


        let lineChatr = new Chart(mychart, {
            type: 'line',
            data: {
                labels: chartLabel,
                datasets: [{
                    label: 'balance chart',
                    data: chartData,
                    borderWidth:1,
                    
                }]
            }
        })
        return lineChatr
    }
}

let expence = new ExpenceChecker();

expence.intialLoad();

expence.submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    expence.submit()
})

expence.seconddform.addEventListener('input', (e) => {
    e.preventDefault();

    expence.categeryfun()
})

expence.myform.addEventListener('input', (event) => {
    event.preventDefault()

    expence.datefun()
    expence.summery()
    expence.amount()
    expence.typeChecking()
    expence.catogery()

})
