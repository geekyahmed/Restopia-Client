import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../services";
// import { RequestModel } from "../../models/request.model";

@Component({
  templateUrl: "./form-client.component.html",
  styleUrls: ["./form-client.component.css"],
  selector: "app-form-client"
})
export class FormClientComponent implements OnInit {
  url: string = "";
  allowedMethods: { name: string; value: string; }[] = [
    { name: "GET", value: "GET" },
    { name: "POST", value: "POST" },
    { name: "PATCH", value: "PATCH" },
    { name: "DELETE", value: "DELETE" },
    { name: "PUT", value: "PUT" },
    { name: "OPTIONS", value: "OPTIONS" }
  ];
  method: string = "GET";

  // @Output()
  // e: EventEmitter<RequestModel[]> = new EventEmitter<RequestModel[]>();

  constructor(private storage: StorageService) {}

  ngOnInit() {
    console.log("[Form]");
  }

  addToLocalStorage() {
    this.storage.addToStorage({
      method: this.method,
      url: this.url,
      response: {
        message: "This is Facebook"
      }
    });
  }

  // updateHistory() {
  // }

  formatJson(event: any) {
    // console.log(event.key);
    const SINGLE_QUOTE = "'";
    const DOUBLE_QUOTE = '"';
    const LEFT_CURLY_BRACE = "{";
    const RIGHT_CURLY_BRACE = "}";
    const LEFT_SQUARE_BRACKET = "[";
    const RIGHT_SQUARE_BRACKET = "]";

    const PAIRS = {
      [SINGLE_QUOTE]: SINGLE_QUOTE,
      [DOUBLE_QUOTE]: DOUBLE_QUOTE,
      [LEFT_CURLY_BRACE]: RIGHT_CURLY_BRACE,
      [LEFT_SQUARE_BRACKET]: RIGHT_SQUARE_BRACKET
    };
    if (!Object.keys(PAIRS).includes(event.key)) {
      // event.target.value = JSON.stringify(
      //   JSON.parse(event.target.value), undefined, 2
      // );
      return;
    }
    const cursorPosition = event.target.selectionStart;
    const cursorEnd = event.target.selectionEnd;
    const closingChar = PAIRS[event.key];
    event.target.value = event.target.value.substr(0, cursorPosition) + closingChar + event.target.value.substr(cursorPosition);
    setTimeout(() => {
      event.target.value = JSON.stringify(
        JSON.parse(event.target.value), undefined, 2
      );
    }, 100);
    event.target.setSelectionRange(cursorPosition, cursorEnd);
  }

  logMethod() {
    console.log(this.method);
  }
}
