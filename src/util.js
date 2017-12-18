const isNumber = val => typeof val === 'number' && !Number.isNaN(val);

const isArray = val => !!val && Array.isArray(val);

export { isNumber, isArray };
