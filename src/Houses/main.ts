import { House } from "./Heritages/House";
import { EchoHouse } from "./Heritages/EchoHouse";
import { RandomHouse } from "./Heritages/RandomHouse";

import { HouseInjection } from "./Injections/HouseInjection";
import { DefaultOrder } from "./Injections/Behaviours/Order/DefaultOrder";
import { DefaultFormat } from "./Injections/Behaviours/Formatter/DefaultFormat";
import { ShuffleOrder } from "./Injections/Behaviours/Order/ShuffleOrder";
import { EchoFormat } from "./Injections/Behaviours/Formatter/EchoFormat";
import { DividerFormat } from "./Injections/Behaviours/Formatter/DividerFormat";

const h = new HouseInjection(new ShuffleOrder(), new DividerFormat())

console.log(h.recite())