function getRandomIds(learnData) {
    const randomIds = [];
    const learnDataCopy = [...learnData]; // Create a copy of the original array to avoid modifying it
    while (randomIds.length < 3 && learnDataCopy.length > 0) {
        const randomIndex = Math.floor(Math.random() * learnDataCopy.length); // Get a random index within the array
        const randomId = learnDataCopy[randomIndex].id; // Get the id at the random index
        if (!randomIds.includes(randomId)) { // Check if the random id is already in the array
            randomIds.push(randomId); // Add the random id to the array of random ids
        }
        learnDataCopy.splice(randomIndex, 1); // Remove the object at the random index from the copy of the array
    }
    return randomIds;
}
