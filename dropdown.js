class DropDown {
  constructor(options) {
    this.options = {};
    this.options.elements = {};
    this.options.data = {};
    this.options.data.allItems = options.data.allItems;
    this.options.data.selectedItem = this.options.data.allItems[0];
    this.init();
  }
  
  selectedTemplate(data) {
    let template = `<div class="dropdown__item dropdown__item--selected" tabindex="0">${data}</div>`;
    return template;
  }

  itemsTemplate(data) {
    let template = `<ul class="dropdown__items">`;
    data.forEach(item => {
      template += `<li class="dropdown__item" tabindex="0">${item}</li>`;
    });
    template += "</ul>";
    return template;
  }

  template() {
    return (
      this.selectedTemplate(this.options.data.selectedItem) +
      this.itemsTemplate(this.options.data.allItems)
    );
  }

  generate() {
    let root = document.getElementsByClassName("dropdown")[0];
    root.innerHTML = this.template();
  }

  crawl() {
    console.log(this.options);
    this.options.elements.selectedItem = document.getElementsByClassName(
      "dropdown__item--selected"
    )[0];
    this.options.elements.allItems = document.querySelectorAll(
      ".dropdown__items .dropdown__item"
    );
    this.options.elements.root = document.getElementsByClassName("dropdown")[0];
    console.log(this.options);
  }

  open() {
    document.body.classList.add("open-dropdown");
  }

  close() {
    document.body.classList.remove("open-dropdown");
  }

  events() {
    let _this = this;
    this.options.elements.selectedItem.addEventListener("click", function() {
      document.body.classList.toggle("open-dropdown");
    });
    this.options.elements.allItems.forEach(item => {
      item.addEventListener("click", function(event) {
        _this.select(event.target);
        _this.close();
      });
    });
  }

  select(target) {
    let selected = target.textContent;
    this.options.elements.selectedItem.textContent = selected;
  }

  init() {
    this.generate();
    this.crawl();
    this.events();
  }
}

// Initializing Dropdown
// Dropdown.init();

let dropdown = new DropDown({
  data: {
    allItems: ["Item 1", "Item 2", "Item 3"]
  }
});

// dropdown.init();