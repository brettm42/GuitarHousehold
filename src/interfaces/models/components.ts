export type SerialNumberLocation = typeof serialNumberLocations[number];
const serialNumberLocations = [
  'Body',
  'Headstock',
  'Neck',
  'Neck Heel',
  'Neck Plate',
  'None'
] as const;

export type BodyStyle = typeof bodyStyles[number];
const bodyStyles = [
  'Flattop',
  'Hollowbody',
  'Jaguar',
  'Jazzcaster',
  'Jazzmaster',
  'Les Paul',
  'Mustang',
  'Offset',
  'Resonator',
  'Semi-Hollowbody',
  'SG',
  'Starcaster',
  'Stratocaster',
  'Telecaster',
  'Unique'  
] as const;

export type PickupCover = typeof pickupCovers[number];
const pickupCovers = [
  'Foil',
  'Metal',
  'None',
  'Plastic'
] as const;

export type PickupPosition = typeof pickupPositions[number];
const pickupPositions = [
  'Neck',
  'Middle',
  'Bridge'
] as const;

export type PickupMount = typeof pickupMounts[number];
const pickupMounts = [
  'Body',
  'Bridge',
  'Neck',
  'Pickguard',
  'Top',
  'Under-bridge',
  'Under-saddle'
] as const;

export type PickupType = typeof pickupTypes[number];
const pickupTypes = [
  'Active Humbucker',
  'Charlie Christian',
  'Dog-ear P90',
  'Filtertron',
  'Goldfoil',
  'Humbucker',
  'Jaguar',
  'Jazzmaster',
  'Mini-humbucker',
  'P90',
  'Piezo',
  'Single-coil',
  'Wide-range Humbucker'
] as const;

export type PickupSize = typeof pickupSizes[number];
const pickupSizes = [
  'Dog-ear',
  'Humbucker',
  'Soapbar',
  'Jazzmaster',
  'Mini-humbucker',
  'Piezo',
  'Split-coil',
  'Stratocaster',
  'Surface-mount',
  'Telecaster Bridge',
  'Wide-range Humbucker'
] as const;

export type CaseStyle = typeof caseStyles[number];
const caseStyles = [
  'Arched',
  'Flat',
  'Gig Bag'
] as const;

export type TremoloType = typeof tremoloTypes[number];
const tremoloTypes = [
  'Bigsby',
  'Floyd-rose',
  'Hagstrom Tremar',
  'Jazzmaster',
  'Les Paul',
  'Mustang',
  'Stratocaster'
] as const;
