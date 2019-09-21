
export type SerialNumberLocation = typeof serialNumberLocations[number];
const serialNumberLocations = [
    'Neck',
    'Body',
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
    'Offset',
    'Hollowbody',
    'Semi-Hollowbody',
    'Starcaster',
    'Flattop',
    'Unique'
] as const;

export type StringType = typeof stringTypes[number];
const stringTypes = [
    "D'Addario EPN22 Pure Nickel, Jazz Medium, 13-56",
    "D'Addario EPN21 Pure Nickel, Jazz Light, 12-51",
    "D'Addario EJ12 80/20 Bronze Acoustic, Medium, 13-56",
    "Ernie Ball 12-string Medium Nickel Wound Set, .011-.052",
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

export type CaseStyle = typeof caseStyles[number];
const caseStyles = [
    'Flat',
    'Arched'
] as const;
