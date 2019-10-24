export type SerialNumberLocation = typeof serialNumberLocations[number];
const serialNumberLocations = [
    'Neck',
    'Body',
    'Neck Heel',
    'Neck Plate',
    'None'
] as const;

export type BodyStyle = typeof bodyStyles[number];
const bodyStyles = [
    'Telecaster', 
    'Stratocaster',
    'Jazzmaster',
    'Jaguar',
    'Mustang',
    'Les Paul',
    'SG',
    'Offset',
    'Archtop',
    'Hollowbody',
    'Semi-Hollowbody',
    'Starcaster',
    'Flattop',
    'Unique'
] as const;

export type StringType = typeof stringTypes[number];
const stringTypes = [
    'D\'Addario EPN22 Pure Nickel, Jazz Medium, 13-56',
    'D\'Addario EPN21 Pure Nickel, Jazz Light, 12-51',
    'D\'Addario EJ12 80/20 Bronze Acoustic, Medium, 13-56',
    'D\'Addario EJ17 Phosphor Bronze Acoustic, Medium, 13-56',
    'Ernie Ball 12-string Medium Nickel Wound, 11-52',
    'Factory',
    'Custom',
    'None'
] as const;

export type PickupPosition = typeof pickupPositions[number];
const pickupPositions = [
    'Neck',
    'Middle',
    'Bridge'
] as const;

export type PickupType = typeof pickupTypes[number];
const pickupTypes = [
    'Humbucker',
    'P90',
    'Dog-ear P90',
    'Single-coil',
    'Jazzmaster',
    'Jaguar',
    'Wide-range Humbucker',
    'Piezo',
    'Mini-humbucker',
    'Active Humbucker'
] as const;

export type PickupSize = typeof pickupSizes[number];
const pickupSizes = [
    'Humbucker',
    'Soapbar',
    'Dog-ear',
    'Jazzmaster',
    'Wide-range Humbucker',
    'Stratocaster',
    'Mini-humbucker',
    'Telecaster Bridge'
] as const;

export type CaseStyle = typeof caseStyles[number];
const caseStyles = [
    'Flat',
    'Arched'
] as const;

export type TremoloType = typeof tremoloTypes[number];
const tremoloTypes = [
    'Jazzmaster',
    'Bigsby',
    'Floyd-rose',
    'Stratocaster',
    'Les Paul',
    'Mustang'
] as const;
