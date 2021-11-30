export const allCategories = [
    { label: 'Agriculture', value: 'AG' },
    { label: 'Arts', value: 'AR' },
    { label: 'Business and Commerce', value: 'BC' },
    { label: 'Community Development', value: 'CD' },
    { label: 'Consumer Protection', value: 'CP' },
    { label: 'Disaster Prevention and Relief', value: 'DPR' },
    { label: 'Education', value: 'ED' },
    { label: 'Employment, Labor and Training', value: 'ELT' },
    { label: 'Energy', value: 'EN' },
    { label: 'Environment', value: 'ENV' },
    { label: 'Food and Nutrition', value: 'FN' },
    { label: 'Health', value: 'HL' },
    { label: 'Housing', value: 'HO' },
    { label: 'Humanities', value: 'HU' },
    { label: 'Income Security and Social Services', value: 'ISS' },
    { label: 'Information and Statistics', value: 'IS' },
    { label: 'Law, Justice and Legal Services', value: 'LJL' },
    { label: 'Natural Resources', value: 'NR' },
    { label: 'Regional Development', value: 'RD' },
    { label: 'Science and Technology', value: 'ST' },
  ];

export function categoryToCode(label) {
    for (let pair of allCategories) {
        if (pair.label == label) {
            return pair.value
        }
    }
    if (label) {
        console.log("Unknown label detected: " + label)
    }
    return false;
}

export function codeToCategory(value) {
    for (let pair of allCategories) {
        if (pair.value == value) {
            return pair.label
        }
    }
    if (value) {
        console.log("Unknown code detected: " + value)
    }
    return false;
}