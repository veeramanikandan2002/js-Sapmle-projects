class todo {
    constructor() {
        this.inputBox = document.getElementById('input-box');
        this.unorderList = document.getElementById('unorder-list');
        this.count = 0;
        this.indicator = document.querySelectorAll('.all')
        this.createList = document.createElement('li');
        this.Allarr = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
        console.log(JSON.parse(localStorage.getItem("items")))
    }

    addList() {

        if (this.inputBox.value == "") {
            alert("enter some words")
        }
        else {
            let createList = document.createElement('li');

            createList.classList.add('li-list');
            createList.innerHTML = `<div>
            <input class='check-box'type='checkbox'for="input-box" onclick="firstTodo.checker()">
          ${this.inputBox.value}
           </div>
           <div class="edit-div" id=${this.count}>
           <button class="edit-btn" onclick="firstTodo.edit(this)"><i class="fa-solid fa-pen"></i>
           </button>  
           <button class="remove-btn" onclick="firstTodo.deleteitems(this)" ><i class="fa-solid fa-trash-can"></i></button
           </div>
         `
                ;

            this.unorderList.append(createList)

            this.setLocalStorage()
            this.count++

            this.inputBox.value = "";


        }
    }



    display() {
        for (const i of this.indicator) {
            i.classList.remove("indicator");
        }

        this.indicator[0].classList.add("indicator")

        this.unorderList.innerHTML = ""
        this.Allarr.map((values) => {


            this.createList = document.createElement('li');
            this.createList.classList.add('li-list');
            this.createList.innerHTML = `<div>
            <input class='check-box'type='checkbox'for="input-box" onclick="firstTodo.checker()"  ${values.check ? "checked" : ""} >
          ${values.value}
           </div>
           <div class="edit-div"id=${this.count}>
           <button class="edit-btn"  onclick="firstTodo.edit(this)"><i class="fa-solid fa-pen"></i>
           </button>  
           <button class="remove-btn" onclick="firstTodo.deleteitems(this)" ><i class="fa-solid fa-trash-can"></i></button
           </div>
         `
            this.unorderList.append(this.createList);


        })


    }



    setLocalStorage() {
        let obj = {}
        obj["id"] = `${this.count}`
        obj["value"] = this.inputBox.value;
        obj["check"] = false
        console.log(obj)
        this.Allarr.push(obj)
        localStorage.setItem("items", JSON.stringify(this.Allarr))
    }

    deleteitems(event) {
       console.log("hello")
        let listItem = event.parentNode.id;

        this.Allarr = this.Allarr.filter((elem) => {
            return elem.id !== listItem
        })
        console.log(this.Allarr)

        localStorage.setItem("items", JSON.stringify(this.Allarr));
        this.unorderList.removeChild(event.parentElement.parentElement);
       

    }
    edit(event) {

        this.Allarr.forEach((val) => {
            this.inputBox.value = val.value
        })
        let listItems = event.parentNode.id;

        this.Allarr = this.Allarr.filter((elem) => {
            return elem.id !== listItems
        })

        localStorage.setItem("items", JSON.stringify(this.Allarr));
        this.unorderList.removeChild(event.parentElement.parentElement);
    }



    pending() {
        for (const i of this.indicator) {
            i.classList.remove("indicator");
        }
        this.indicator[2].classList.add("indicator")

        this.unorderList.innerHTML = "";

        this.Allarr.forEach((value) => {
            if ((value.check == false)) {

                this.createList = document.createElement('li');
                this.createList.classList.add('li-list');
                this.createList.innerHTML = `<div>
                <input class='check-box'type='checkbox'for="input-box" onclick="firstTodo.checker()" ${value.check == false ? "" : "checked"} >
              ${value.value}
               </div>
               <div class="edit-div">
               <button class="edit-btn"><i class="fa-solid fa-pen"></i>
               </button>  
               <button class="remove-btn" onclick="firstTodo.deleteitems(this)" ><i class="fa-solid fa-trash-can"></i></button
               </div>
             `
                this.unorderList.append(this.createList);
            }
           
        }
        )



    }

    complete() {
        for (const i of this.indicator) {
            i.classList.remove("indicator");
        }
        this.indicator[1].classList.add("indicator")
        this.unorderList.innerHTML = "";
        this.Allarr.forEach((value) => {
            if ((value.check == true)) {

                this.createList = document.createElement('li');
                this.createList.classList.add('li-list');
                this.createList.innerHTML = `<div>
                <input class='check-box'type='checkbox'for="input-box" onclick="firstTodo.checker()" ${value.check ? "checked" : ""} >
              ${value.value}
               </div>
               <div class="edit-div">
               <button class="edit-btn"><i class="fa-solid fa-pen"></i>
                             </button>  
               <button class="remove-btn" onclick="firstTodo.deleteitems(this)" ><i class="fa-solid fa-trash-can" color:white></i></button
               </div>
             `
                this.unorderList.append(this.createList);
            }
        }
        )
      

    }


    checker() {
        let checkbox = document.querySelectorAll(".check-box");

        this.Allarr.forEach((elem,i) => {
            
            if (checkbox[i].checked) {
                elem.check = true
            }
            else {
                elem.check = false
            }
        })

        localStorage.setItem("items", JSON.stringify(this.Allarr))
    }



}

let firstTodo = new todo();
firstTodo.display()