export type TextKeys = typeof textKey[number];
const textKey = [
  'AboutPageBody',
  'AboutPageImageAlt',
  'DataDetailTableLabel',
  'DebugIcon',
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

  // Summary Components
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
  'SummaryLabelUndelivered'
] as const;

const stringMap: Record<TextKeys, string> = {
  AboutPageBody: 'This is the about page...', 
  AboutPageImageAlt: 'Collection Image',
  DataDetailTableLabel: 'guitar detailed data table',
  DebugIcon: '?',
  DataDetailIdLabel: 'id',
  DataDetailMakeLabel: 'Make',
  DataDetailNameLabel: 'Name',
  DataTableSeparator: ' • ',
  GuitarAllPurchaseStoreChartTitle: 'Every Purchase by Store',
  GuitarColorChartTitle: 'Guitar Colors',
  GuitarDataTabelLabel: 'Guitar data table',
  GuitarMakesChartTitle: 'Guitar Makes',
  GuitarPurchaseStoreChartTitle: 'Guitar Purchase by Store',
  GuitarPurchaseYearChartLabel1: 'Year',
  GuitarPurchaseYearChartLabel2: 'Total',
  GuitarPurchaseYearChartTitle: 'Guitar Purchase by Year',
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
  SummaryLabelValues: 'Values'

};

export function getStringText(key: TextKeys): string {
  return stringMap[key];
}
