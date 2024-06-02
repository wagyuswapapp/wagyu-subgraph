import {Value,JSONValue, BigInt, BigDecimal, ipfs, json, Bytes, log } from "@graphprotocol/graph-ts"

import {
  TokenAdded
} from "../generated/WagyuRegistry/WagyuRegistry"
import { Token } from "../generated/schema"




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



let token = new Token(event.params._hash);
token.hash=event.params._hash;

token.name=jsonData.toObject().get('tokenName').toString();
token.symbol=jsonData.toObject().get('tokenSymbol').toString();
token.address=jsonData.toObject().get('tokenAddress').toString();
token.chainId=jsonData.toObject().get('chainId').toString();
token.decimals=jsonData.toObject().get('tokenDecimals').toString();

token.logoURI=jsonData.toObject().get('icon').toString();

token.save();



}
