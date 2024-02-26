const getPrice = require("../../externalAPI/getEthPrice")


checkEqual = (array, numberToCheck) => {
    let index = 0;
    while (index < array.length) {
        if (array[index] === numberToCheck) {
            return (true);
        }
        index++;
    }
    return (false);
}


module.exports.getRandomNumbers = async (body) => {
    console.log(body.min);
    console.log(body.max);
    console.log(body.quantity);
    console.log(body.is_repeat);

    //const numberArray = new Array(body.quantity);
    const numberArray = [];
    let finalNumber;
    let isRepeat = true;

    if (body.min > body.max) {
        return ("Entered maximun value is less than the minimun value");
    }
    else if (body.min == body.max) {
        if (!body.is_repeat && body.quantity > 1) {
            return ("Can't arange this number with not repeat number condition");
        }
        for (let i = 0; i < body.quantity; i++) {
            numberArray[i] = body.min;
        }
        return (numberArray);
    }


    for (let i = 0; i < body.quantity; i++) {
        const number = await getPrice.getEthPrice();
        let decimalNumber = (number % 1).toFixed(5); // Get 2 decimal places
        decimalNumber = parseFloat(decimalNumber);


        if (body.min < decimalNumber && decimalNumber < body.max) {
            console.log("1111");
            finalNumber = (body.min + body.max) / 2;
            finalNumber += decimalNumber;
            if (!body.is_repeat && body.quantity > 1) {
                isRepeat = checkEqual(numberArray, finalNumber);
                if (isRepeat) {
                    const number = await getPrice.getEthPrice();
                    let decimalNumber = (number % 1).toFixed(5); // Get 2 decimal places
                    decimalNumber = parseFloat(decimalNumber);
                    finalNumber = (body.min + body.max) / 2;
                    finalNumber += decimalNumber;
                }

                isRepeat = true;
            }

            if (!body.is_repeat && body.quantity > 1) {
                if (!(numberArray.length === 0)) {
                    while (isRepeat) {
                        isRepeat = checkEqual(numberArray, finalNumber);
                        if (isRepeat) {
                            const number = await getPrice.getEthPrice();
                            let decimalNumber = (number % 1).toFixed(5); // Get 2 decimal places
                            decimalNumber = parseFloat(decimalNumber);
                            finalNumber = (body.min + body.max) / 2;
                            finalNumber += decimalNumber;
                        }
                    }
                }
                isRepeat = true;
            }
            numberArray[i] = finalNumber;
            continue;
        }


        else if (decimalNumber < body.min) {
            finalNumber = (body.min + body.max) / 2;
            finalNumber = finalNumber + decimalNumber;
            while (!(finalNumber <= body.max)) {
                finalNumber -= decimalNumber;
                decimalNumber /= 10;
                finalNumber += decimalNumber;
            }
            if (!body.is_repeat && body.quantity > 1) {
                if (!(numberArray.length === 0)) {
                    while (isRepeat) {
                        isRepeat = checkEqual(numberArray, finalNumber);
                        if (isRepeat) {
                            const number = await getPrice.getEthPrice();
                            let decimalNumber = (number % 1).toFixed(5);
                            decimalNumber = parseFloat(decimalNumber);
                            finalNumber = body.min + decimalNumber;
                            while (!(finalNumber <= body.max)) {
                                decimalNumber /= 10;
                                finalNumber = body.min + decimalNumber;
                            }
                        }
                    }
                }
                isRepeat = true;
            }
            numberArray[i] = finalNumber;
            continue;
        }


        else {
            finalNumber = body.max - decimalNumber;
            while (!(finalNumber >= body.min)) {
                decimalNumber /= 10;
                finalNumber = body.max - decimalNumber;
            }

            if (!body.is_repeat && body.quantity > 1) {
                while (isRepeat) {
                    isRepeat = checkEqual(numberArray, finalNumber);
                    if (isRepeat) {
                        const number = await getPrice.getEthPrice();
                        let decimalNumber = (number % 1).toFixed(5); 
                        decimalNumber = parseFloat(decimalNumber);
                        finalNumber = body.max - decimalNumber;
                        while (!(finalNumber >= body.min)) {
                            decimalNumber /= 10;
                            finalNumber = body.max - decimalNumber;
                        }
                    }
                }
                isRepeat = true;
            }


            if (!body.is_repeat && body.quantity > 1) {
                if (!(numberArray.length === 0)) {
                    while (isRepeat) {
                        isRepeat = checkEqual(numberArray, finalNumber);
                        if (isRepeat) {
                            const number = await getPrice.getEthPrice();
                        let decimalNumber = (number % 1).toFixed(5); 
                        decimalNumber = parseFloat(decimalNumber);
                        finalNumber = body.max - decimalNumber;
                        while (!(finalNumber >= body.min)) {
                            decimalNumber /= 10;
                            finalNumber = body.max - decimalNumber;
                        }
                        }
                    }
                }
                isRepeat = true;
            }
            numberArray[i] = finalNumber;
            continue;
        }
    }
    return (numberArray);
}
