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
    'Resonator',
    'Unique'
] as const;

export type PickupPosition = typeof pickupPositions[number];
const pickupPositions = [
    'Neck',
    'Middle',
    'Bridge'
] as const;

export type PickupMount = typeof pickupMounts[number];
const pickupMounts = [
    'Neck',
    'Pickguard',
    'Top',
    'Under-saddle'
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
    'Arched',
    'Gig Bag'
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
