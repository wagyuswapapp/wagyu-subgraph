import {Value,JSONValue, BigInt, BigDecimal, ipfs, json, Bytes, log } from "@graphprotocol/graph-ts"

import {
  TokenAdded
} from "../generated/WagyuRegistry/WagyuRegistry"
import { Registry } from "../generated/schema"




export function handleTokenAdded(event: TokenAdded): void {



let data = ipfs.cat(event.params._hash);

  if (!data || (data as Bytes).length < 1) {
    log.warning('JSON DATA FROM IPFS IS EMPTY {}', [event.params._hash]);
    return;
}

let jsonData = json.fromBytes(data as Bytes);
  if (jsonData.isNull()) {
    log.warning('JSON DATA FROM IPFS IS NULL {}', [event.params._hash]);
    return;
  }



let registry = new Registry(event.params._hash);
registry.hash=event.params._hash;

registry.tokenName=jsonData.toObject().get('tokenName').toString();
registry.tokenSymbol=jsonData.toObject().get('tokenSymbol').toString();
registry.tokenAddress=jsonData.toObject().get('tokenAddress').toString();

registry.tokenDecimals=jsonData.toObject().get('tokenDecimals').toString();

registry.icon=jsonData.toObject().get('icon').toString();

registry.save();



}
