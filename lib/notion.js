const recordMapParser = (recordMap) => {
    const blocks = Object.keys(recordMap.block)
        .map((item) => recordMap.block[item])
        .map((item) => item.value);
    return blocks;
};

export { recordMapParser };