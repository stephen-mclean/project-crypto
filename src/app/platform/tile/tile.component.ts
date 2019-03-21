import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import {
  faDollarSign,
  faHeart as faSolidHeart,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faOutlineHeart } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-tile",
  templateUrl: "./tile.component.html",
  styleUrls: ["./tile.component.css"]
})
export class TileComponent implements OnChanges {
  @Input() name: string;
  @Input() price: number;
  @Input() isFavourite: boolean;
  @Output() toggleFavourite = new EventEmitter<any>();

  faDollarSign: IconDefinition = faDollarSign;
  faHeart: IconDefinition;

  ngOnChanges() {
    if (this.isFavourite) {
      this.faHeart = faSolidHeart;
    } else {
      this.faHeart = faOutlineHeart;
    }
  }

  onToggleFavourite() {
    this.toggleFavourite.emit();
  }
}
