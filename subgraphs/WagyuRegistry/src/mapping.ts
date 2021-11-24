import { BigInt } from "@graphprotocol/graph-ts"
import {
  TokenAdded
} from "../generated/WagyuRegistry/WagyuRegistry"
import { Registry } from "../generated/schema"

export function handleTokenAdded(event: TokenAdded): void {

let registry = new Registry(event.params._hash);
registry.hash=event.params._hash;

registry.save();

}
