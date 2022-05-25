export type TextKeys = typeof textKey[number];
const textKey = [
  // About Page
  'AboutPageBody',
  'AboutPageImageAlt',
  'DebugIcon',

  // Data Page
  'DataDetailTableLabel',
  'DataDetailNameLabel',
  'DataDetailMakeLabel',
  'DataDetailIdLabel',

  // Chart/Title Components
  'DataTableSeparator',
  'GuitarAllPurchaseStoreChartTitle',
  'GuitarColorChartTitle',
  'GuitarDataTabelLabel',
  'GuitarMakesChartTitle',
  'GuitarPurchaseStoreChartTitle',
  'GuitarPurchaseYearChartTitle',
  'GuitarPurchaseYearChartLabel1',
  'GuitarPurchaseYearChartLabel2',

  // GuitarUtils
  'GuitarUtilsBought',
  'GuitarUtilsControls',
  'GuitarUtilsDelivered',
  'GuitarUtilsFrets',
  'GuitarUtilsLasted',
  'GuitarUtilsManufactured',
  'GuitarUtilsMods',
  'GuitarUtilsNotDelivered',
  'GuitarUtilsOld',
  'GuitarUtilsPickups',
  'GuitarUtilsPurchased',
  'GuitarUtilsStarted',
  'GuitarUtilsStrings',
  'GuitarUtilsVs',

  // Summary Page
  'SummaryLabelBreakdown',
  'SummaryLabelConstruction',
  'SummaryLabelInProgress',
  'SummaryLabelMissingCases',
  'SummaryLabelMostCommon',
  'SummaryLabelOutliers',
  'SummaryLabelPartValues',
  'SummaryLabelPickups',
  'SummaryLabelRandomPick',
  'SummaryLabelStrings',
  'SummaryLabelTimeline',
  'SummaryLabelValues',
  'SummaryLabelUndelivered',

  // Summary Components - Most Common
  'SummaryComponentMostCommonMake',
  'SummaryComponentMostCommonBody',
  'SummaryComponentMostCommonColor',
  'SummaryComponentMostCommonPickup',
  'SummaryComponentMostCommonNumOfPickups',
  'SummaryComponentMostCommonTuning',
  'SummaryComponentMostCommonScale',
  'SummaryComponentMostCommonNutWidth',
  'SummaryComponentMostCommonRadius',
  'SummaryComponentMostCommonFrets',
  'SummaryComponentMostCommonControls',
  'SummaryComponentMostCommonTremolo',
  'SummaryComponentMostCommonYear',
  'SummaryComponentMostCommonCase',
  'SummaryComponentMostCommonStore',
  'SummaryComponentMostCommonAge'
] as const;

const stringMap: Record<TextKeys, string> = {
  // About Page
  AboutPageBody: 'This is the about page...', 
  AboutPageImageAlt: 'Collection Image',
  DebugIcon: '?',

  // Data Page
  DataDetailTableLabel: 'guitar detailed data table',
  DataDetailIdLabel: 'id',
  DataDetailMakeLabel: 'Make',
  DataDetailNameLabel: 'Name',
  DataTableSeparator: ' • ',

  // Chart/Title Components
  GuitarAllPurchaseStoreChartTitle: 'Every Purchase by Store',
  GuitarColorChartTitle: 'Guitar Colors',
  GuitarDataTabelLabel: 'Guitar data table',
  GuitarMakesChartTitle: 'Guitar Makes',
  GuitarPurchaseStoreChartTitle: 'Guitar Purchase by Store',
  GuitarPurchaseYearChartLabel1: 'Year',
  GuitarPurchaseYearChartLabel2: 'Total',
  GuitarPurchaseYearChartTitle: 'Guitar Purchase by Year',

  // GuitarUtils
  GuitarUtilsBought: 'bought',
  GuitarUtilsControls: 'controls',
  GuitarUtilsDelivered: 'delivered',
  GuitarUtilsFrets: 'frets',
  GuitarUtilsLasted: 'lasted',
  GuitarUtilsManufactured: 'manufactured',
  GuitarUtilsMods: 'modifications',
  GuitarUtilsNotDelivered: 'not yet delivered',
  GuitarUtilsOld: 'old',
  GuitarUtilsPurchased: 'purchased',
  GuitarUtilsPickups: 'pickups',
  GuitarUtilsStarted: 'started',
  GuitarUtilsStrings: 'strings',
  GuitarUtilsVs: 'vs.',

  // Summary Page
  SummaryLabelBreakdown: 'Breakdown',
  SummaryLabelConstruction: 'Construction',
  SummaryLabelInProgress: 'In Progress Projects',
  SummaryLabelMissingCases: 'Missing Cases',
  SummaryLabelMostCommon: 'Most Common',
  SummaryLabelOutliers: 'Outliers',
  SummaryLabelPartValues: 'Case/Pickup Values',
  SummaryLabelPickups: 'Pickups',
  SummaryLabelRandomPick: 'Random Pick',
  SummaryLabelStrings: 'Strings',
  SummaryLabelTimeline: 'Timeline',
  SummaryLabelUndelivered: 'Undelivered',
  SummaryLabelValues: 'Values',

  // Summary Components - Most Common
  SummaryComponentMostCommonMake: 'Make',
  SummaryComponentMostCommonBody: 'Body',
  SummaryComponentMostCommonColor: 'Color',
  SummaryComponentMostCommonPickup: 'Pickup',
  SummaryComponentMostCommonNumOfPickups: 'Number of Pickups',
  SummaryComponentMostCommonTuning: 'Tuning',
  SummaryComponentMostCommonScale: 'Scale Length',
  SummaryComponentMostCommonNutWidth: 'Nut Width',
  SummaryComponentMostCommonRadius: 'Neck Radius',
  SummaryComponentMostCommonFrets: 'Frets',
  SummaryComponentMostCommonControls: 'Number of Controls',
  SummaryComponentMostCommonTremolo: 'Tremolo Style',
  SummaryComponentMostCommonYear: 'Manufacture Year',
  SummaryComponentMostCommonCase: 'Case Style',
  SummaryComponentMostCommonStore: 'Store',
  SummaryComponentMostCommonAge: 'Age'
};

export function getStringText(key: TextKeys): string {
  return stringMap[key];
}
