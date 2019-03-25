import { Component, HostListener, Output, EventEmitter } from "@angular/core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-scroll",
  templateUrl: "./scroll.component.html",
  styleUrls: ["./scroll.component.css"]
})
export class ScrollComponent {
  @Output() onHitBottom = new EventEmitter<any>();
  faSpinner = faSpinner;

  @HostListener("window:scroll", [])
  onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.onHitBottom.emit();
    }
  }
}
