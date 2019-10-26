let Dropdown = {
  // Utilities
  data: {
    selectedItems: "Item 1",
    allItems: ["Item 1", "Item 2", "Item 3"]
  },
  elements: {},

  // Functions
  selectedTemplate: function(data) {
    let template = `<div class="dropdown__item dropdown__item--selected" tabindex="0">${data}</div>`;
    return template;
  },

  itemsTemplate: function(data) {
    let template = `<ul class="dropdown__items">`;
    data.forEach(item => {
      template += `<li class="dropdown__item" tabindex="0">${item}</li>`;
    });
    template += "</ul>";
    return template;
  },

  template: function() {
    return (
      this.selectedTemplate(this.data.selectedItems) +
      this.itemsTemplate(this.data.allItems)
    );
  },

  generate: function() {
    let root = document.getElementsByClassName("dropdown")[0];
    root.innerHTML = this.template();
  },

  crawl: function() {
    this.elements.selectedItem = document.getElementsByClassName(
      "dropdown__item--selected"
    )[0];
    this.elements.allItems = document.querySelectorAll(
      ".dropdown__items .dropdown__item"
    );
    this.elements.root = document.getElementsByClassName("dropdown")[0];
  },

  open: function() {
    document.body.classList.add("open-dropdown");
  },

  close: function() {
    document.body.classList.remove("open-dropdown");
  },

  events: function() {
    let _this = this;
    this.elements.selectedItem.addEventListener("click", function() {
      document.body.classList.toggle("open-dropdown");
    });
    this.elements.allItems.forEach(item => {
      item.addEventListener("click", function(event) {
        _this.select(event.target);
        _this.close();
      });
    });
  },

  select: function(target) {
    let selected = target.textContent;
    this.elements.selectedItem.textContent = selected;
  },
  init: function(){
    this.generate();
    this.crawl();
    this.events();
  }
};

Dropdown.init();

window.addEventListener('DOMContentLoaded',function(){
});

function openDropDown() {
  document.body.classList.toggle("open-dropdown");
}