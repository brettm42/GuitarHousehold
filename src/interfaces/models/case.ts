
import { RetailItem } from "../infrastructure";
import { CaseStyle } from "./components";

export interface Case extends RetailItem {
    readonly caseStyle: CaseStyle;
}
