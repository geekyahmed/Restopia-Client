import { Component, OnInit } from "@angular/core";
import { TabsHistoryService } from "../../services";

@Component({
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"],
  selector: "app-tabs"
})
export class TabsComponent implements OnInit {
  position: number = 1;
  // btnActive: boolean = false;
  tabs: { name: string; id: number; }[] = [
    { name: `Tab ${this.position}`, id: this.position }
  ];

  tabsActiveState: { [ key: number ]: boolean } = {
    1: true
  };

  constructor(private tabsHistory: TabsHistoryService) {}

  ngOnInit() {
    console.log("[Tabs]");
    this.addInitialTab();
    this.getAllPreviouslySavedTabs();
  }

  addInitialTab() {
    this.tabs.forEach((tab) => {
      this.tabsHistory.addTab(tab.name, tab.id);
    });
  }

  addTab() {
    this.position = (this.tabs[this.tabs.length - 1]).id + 1;
    this.tabs.push({
      name: `Tab ${this.position}`,
      id: this.position
    });
    this.tabsHistory.addTab(`Tab ${this.position}`, this.position);
    setTimeout(() => {
      this.tabsActiveState[this.position] = true;
    }, 100);

    // setTimeout(() => {
    //   const addBtn = document.getElementById("add");
    //   const newTab = document.getElementById(this.position.toString());
    //   const newTabContent = document.getElementById(`clr-tab-content-${this.position - 1}`);

    //   console.log(addBtn);

    //   addBtn.setAttribute("aria-selected", "false");
    //   addBtn.classList.remove("active");

    //   newTab.setAttribute("aria-selected", "true");
    //   newTab.classList.add("active");

    //   newTabContent.setAttribute("aria-hidden", "false");
    //   newTabContent.classList.add("active");
    // }, 500);
  }

  removeTab(id: number) {
    this.tabs.forEach((tab) => {
      if (tab.id === id) {
        const index = this.tabs.indexOf(tab);
        if (index > 0) {
          this.position = (this.tabs[index - 1]).id;
        } else {
          this.position = index + 1;
        }
        return this.tabs.splice(index, 1);
      }
    });
    // this.tabs.forEach((tab) => {
    //   if (tab.id === this.position) {
    //     this.position--;
    //   }
    // });
    this.tabsHistory.removeTabAndContent(id);
    setTimeout(() => {
      this.tabsActiveState[this.position] = true;
    }, 100);
    // this.tabs.forEach((tab) => {
    //   if (tab.id > 1) {
    //     tab.id = tab.id--;
    //     tab.name = `Tab ${tab.id}`;
    //   }
    // });
  }

  logTabStates() {
    console.log(this.tabsActiveState);
  }

  getAllPreviouslySavedTabs() {
    this.tabsHistory.getTabs().forEach((tab: any) => {
      const tabToFind = this.tabs.find((t) => t.id === tab.id);
      if (!tabToFind) {
        this.tabs.push(tab);
      }
    });
  }
}
