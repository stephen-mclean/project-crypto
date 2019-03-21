import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faDollarSign, faEuroSign } from "@fortawesome/free-solid-svg-icons";

export interface Currency {
  name: string;
  icon: IconDefinition;
}

export const EUR: Currency = {
  name: "EUR",
  icon: faEuroSign
};

export const USD: Currency = {
  name: "USD",
  icon: faDollarSign
};
